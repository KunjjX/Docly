import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  pathExists: vi.fn(),
  ensureDir: vi.fn(),
  readFile: vi.fn(),
  remove: vi.fn(),
  renderMermaidToPng: vi.fn(),
}));

vi.mock('fs-extra', () => ({
  default: {
    pathExists: mocks.pathExists,
    ensureDir: mocks.ensureDir,
    readFile: mocks.readFile,
    remove: mocks.remove,
  },
}));

vi.mock('../src/utils/mermaidUtils.js', () => ({
  renderMermaidToPng: mocks.renderMermaidToPng,
}));

describe('diagramRender', () => {
  let diagramRender: (
    inputPath: string,
    options: { output?: string },
    diagramType: string
  ) => Promise<void>;
  const testMmdPath = '/tmp/test.diagram.mmd';

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.pathExists.mockResolvedValue(true);
    mocks.ensureDir.mockResolvedValue(undefined);
    mocks.readFile.mockResolvedValue('graph TD\nA-->B');
    mocks.remove.mockResolvedValue(undefined);
    mocks.renderMermaidToPng.mockResolvedValue('/tmp/output.png');

    const mod = await import('../src/commands/diagramRender.js');
    diagramRender = mod.diagramRender;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.KEEP_MMD;
  });

  test('should render diagram and delete source by default', async () => {
    await diagramRender(testMmdPath, {}, 'architecture');

    expect(mocks.pathExists).toHaveBeenCalled();
    expect(mocks.readFile).toHaveBeenCalled();
    expect(mocks.renderMermaidToPng).toHaveBeenCalledOnce();
    expect(mocks.remove).toHaveBeenCalled();
  });

  test('should keep source file when KEEP_MMD is true', async () => {
    process.env.KEEP_MMD = 'true';

    await diagramRender(testMmdPath, {}, 'architecture');

    expect(mocks.renderMermaidToPng).toHaveBeenCalledOnce();
    expect(mocks.remove).not.toHaveBeenCalled();
  });

  test('should throw when input file not found', async () => {
    mocks.pathExists.mockResolvedValue(false);

    await expect(diagramRender(testMmdPath, {}, 'test')).rejects.toThrow('Input file not found');
  });

  test('should use default output directory when not specified', async () => {
    await diagramRender(testMmdPath, {}, 'sequence');

    expect(mocks.ensureDir).toHaveBeenCalled();
  });

  test('should use custom output directory when specified', async () => {
    await diagramRender(testMmdPath, { output: '/custom/output' }, 'er');

    expect(mocks.ensureDir).toHaveBeenCalledWith('/custom/output');
  });

  test('should throw on render failure', async () => {
    mocks.renderMermaidToPng.mockResolvedValue(null);

    await expect(diagramRender(testMmdPath, {}, 'class')).rejects.toThrow(
      'Failed to render diagram to PNG'
    );
  });
});
