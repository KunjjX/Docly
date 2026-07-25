import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  analyzeProject: vi.fn(),
  generateDoc: vi.fn(),
  writeDoc: vi.fn(),
  renderMermaidToPng: vi.fn(),
}));

vi.mock('../src/core/analyzer.js', () => ({
  analyzeProject: mocks.analyzeProject,
}));

vi.mock('../src/core/generator.js', () => ({
  generateDoc: mocks.generateDoc,
}));

vi.mock('../src/utils/fileUtils.js', () => ({
  writeDoc: mocks.writeDoc,
}));

vi.mock('../src/utils/mermaidUtils.js', () => ({
  renderMermaidToPng: mocks.renderMermaidToPng,
}));

describe('runGenerator', () => {
  let runGenerator: (type: string, options?: Record<string, unknown>) => Promise<void>;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.analyzeProject.mockResolvedValue({
      name: 'test-project',
      description: 'A test project',
      techStack: {
        backend: 'Node.js',
        frontend: 'None',
        database: 'None',
        authentication: 'None',
        language: 'JavaScript',
      },
      dependencies: [],
      devDependencies: [],
      structure: ['src'],
      scripts: ['test'],
      entryPoints: ['index.js'],
    });
    mocks.generateDoc.mockResolvedValue('# Test Content');
    mocks.writeDoc.mockResolvedValue('./docs/README.md');
    mocks.renderMermaidToPng.mockResolvedValue('./docs/diagrams/test.png');

    const mod = await import('../src/core/runGenerator.js');
    runGenerator = mod.runGenerator;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should generate doc successfully', async () => {
    await runGenerator('readme', {});

    expect(mocks.analyzeProject).toHaveBeenCalledOnce();
    expect(mocks.generateDoc).toHaveBeenCalledOnce();
    expect(mocks.writeDoc).toHaveBeenCalledOnce();
  });

  test('should pass options to generateDoc', async () => {
    const options = { output: './custom-docs', ai: 'gemini' };
    await runGenerator('srs', options);

    const [, , passedOptions] = mocks.generateDoc.mock.calls[0];
    expect(passedOptions).toMatchObject(options);
  });

  test('should render PNG for diagram type with png format', async () => {
    await runGenerator('diagram', { format: 'png', diagramType: 'architecture' });

    expect(mocks.renderMermaidToPng).toHaveBeenCalledOnce();
    expect(mocks.writeDoc).not.toHaveBeenCalled();
  });

  test('should write doc for diagram type with md format', async () => {
    await runGenerator('diagram', { format: 'md', diagramType: 'architecture' });

    expect(mocks.renderMermaidToPng).not.toHaveBeenCalled();
    expect(mocks.writeDoc).toHaveBeenCalledOnce();
    expect(mocks.writeDoc.mock.calls[0][0]).toBe('diagram:architecture');
  });

  test('should handle errors and throw', async () => {
    mocks.analyzeProject.mockRejectedValue(new Error('Analysis failed'));

    await expect(runGenerator('readme', {})).rejects.toThrow('Analysis failed');
  });

  test('should call writeDoc with correct args', async () => {
    await runGenerator('readme', { output: './my-docs', overwrite: true });

    const [, , outputDir, overwrite] = mocks.writeDoc.mock.calls[0];
    expect(outputDir).toBe('./my-docs');
    expect(overwrite).toBe(true);
  });
});
