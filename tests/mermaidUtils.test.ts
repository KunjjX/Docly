import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  ensureDir: vi.fn(),
  writeFile: vi.fn(),
  remove: vi.fn(),
  execFile: vi.fn(),
}));

vi.mock('fs-extra', () => ({
  default: {
    ensureDir: mocks.ensureDir,
    writeFile: mocks.writeFile,
    remove: mocks.remove,
  },
}));

vi.mock('node:child_process', () => ({
  execFile: mocks.execFile,
}));

describe('renderMermaidToPng', () => {
  let renderMermaidToPng: (code: string, outputPath: string) => Promise<string | null>;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.ensureDir.mockResolvedValue(undefined);
    mocks.writeFile.mockResolvedValue(undefined);
    mocks.remove.mockResolvedValue(undefined);
    mocks.execFile.mockImplementation(
      (_cmd: string, _args: string[], _opts: unknown, cb: (err: Error | null) => void) => {
        cb(null);
        return { on: vi.fn() };
      }
    );

    const mod = await import('../src/utils/mermaidUtils.js');
    renderMermaidToPng = mod.renderMermaidToPng;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should render to PNG successfully', async () => {
    const result = await renderMermaidToPng('graph TD\nA-->B', '/output/diagram.png');

    expect(result).toBe('/output/diagram.png');
    expect(mocks.ensureDir).toHaveBeenCalled();
    expect(mocks.writeFile).toHaveBeenCalled();
    expect(mocks.execFile).toHaveBeenCalled();
    expect(mocks.remove).toHaveBeenCalled();
  });

  test('should return null on render failure', async () => {
    mocks.execFile.mockImplementation(
      (_cmd: string, _args: string[], _opts: unknown, cb: (err: Error | null) => void) => {
        cb(new Error('Render failed'));
        return { on: vi.fn() };
      }
    );

    const result = await renderMermaidToPng('graph TD\nA-->B', '/output/diagram.png');

    expect(result).toBeNull();
  });

  test('should return null on exec error event', async () => {
    const mockChild = {
      on: vi.fn((_event: string, cb: (err: Error) => void) => {
        cb(new Error('Process error'));
      }),
    };
    mocks.execFile.mockImplementation(
      (_cmd: string, _args: string[], _opts: unknown, _cb: unknown) => mockChild
    );

    const result = await renderMermaidToPng('graph TD\nA-->B', '/output/diagram.png');

    expect(result).toBeNull();
  });
});
