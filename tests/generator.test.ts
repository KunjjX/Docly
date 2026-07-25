import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { buildPrompt, parseResponse, stripCodeFences } from '../src/core/generator.js';
import type { ProjectData } from '../src/types';

const mockProject: ProjectData = {
  name: 'test-project',
  description: 'Test',
  version: '1.0.0',
  techStack: {
    backend: 'Express.js',
    frontend: 'React',
    database: 'MongoDB',
    authentication: 'JWT',
    language: 'TypeScript',
  },
  dependencies: ['express', 'react'],
  devDependencies: [],
  structure: ['src', 'tests'],
  scripts: ['start', 'test'],
  entryPoints: ['src/index.ts'],
};

describe('stripCodeFences', () => {
  test('should remove markdown code fences', () => {
    const input = '```\nconst x = 1;\n```\n';
    expect(stripCodeFences(input)).toBe('const x = 1;');
  });

  test('should remove mermaid code fences', () => {
    const input = '```mermaid\nflowchart TD\nA-->B\n```\n';
    expect(stripCodeFences(input)).toBe('flowchart TD\nA-->B');
  });

  test('should remove markdown-language code fences', () => {
    const input = '```markdown\n# Title\nContent\n```\n';
    expect(stripCodeFences(input)).toBe('# Title\nContent');
  });

  test('should handle content without fences', () => {
    const input = '# Just markdown\nNo fences here.';
    expect(stripCodeFences(input)).toBe('# Just markdown\nNo fences here.');
  });

  test('should handle empty content', () => {
    expect(stripCodeFences('')).toBe('');
  });

  test('should trim whitespace', () => {
    expect(stripCodeFences('  hello  ')).toBe('hello');
  });
});

describe('parseResponse', () => {
  test('should throw for empty response', () => {
    expect(() => parseResponse('', 'readme')).toThrow('Invalid AI response');
  });

  test('should throw for null response', () => {
    expect(() => parseResponse(null as unknown as string, 'readme')).toThrow('Invalid AI response');
  });

  test('should throw for non-markdown (no # heading) for docs', () => {
    expect(() => parseResponse('plain text without heading', 'readme')).toThrow(
      'Response does not appear to be valid Markdown'
    );
  });

  test('should accept valid markdown for docs', () => {
    const result = parseResponse('# My Document\n\nContent here.', 'readme');
    expect(result).toBe('# My Document\n\nContent here.');
  });

  test('should strip code fences for docs', () => {
    const result = parseResponse('```markdown\n# Title\nContent\n```\n', 'readme');
    expect(result).toBe('# Title\nContent');
  });

  test('should accept any content for diagram type', () => {
    const result = parseResponse('flowchart TD\nA-->B', 'diagram');
    expect(result).toBe('flowchart TD\nA-->B');
  });

  test('should trim output', () => {
    const result = parseResponse('  # Title\n\nBody  ', 'readme');
    expect(result).toBe('# Title\n\nBody');
  });

  test('should reject short content', () => {
    expect(() => parseResponse('# Hi', 'readme')).toThrow(
      'Content is too short to be valid documentation'
    );
  });
});

describe('buildPrompt', () => {
  test('should build prompt for readme type', () => {
    const result = buildPrompt('readme', mockProject);
    expect(result).toContain('test-project');
    expect(result).toContain('README.md');
  });

  test('should build prompt for diagram type with options', () => {
    const result = buildPrompt('diagram', mockProject, { diagramType: 'sequence' });
    expect(result).toContain('SEQUENCE');
  });

  test('should throw for unknown type', () => {
    expect(() => buildPrompt('unknown', mockProject)).toThrow('Unknown document type');
  });
});

describe('generateDoc', () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test-key';
    process.env.MAX_RETRIES = '2';
  });

  afterEach(() => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.MAX_RETRIES;
  });

  test('should reject unknown AI provider', async () => {
    vi.resetModules();
    const { generateDoc } = await import('../src/core/generator.js');
    await expect(generateDoc('readme', mockProject, { ai: 'test' })).rejects.toThrow(
      'Unknown AI provider: test'
    );
  }, 10000);
});
