import { describe, expect, test } from 'vitest';
import type { TechStack } from '../src/types';
import {
  getErrorMessage,
  validateDocType,
  validateFilePath,
  validateMarkdown,
  validateProjectData,
} from '../src/utils/validator.js';

describe('validateProjectData', () => {
  test('should return error for null data', () => {
    const result = validateProjectData(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Project data is required');
  });

  test('should return error for missing name', () => {
    const result = validateProjectData({
      name: '',
      description: '',
      version: '',
      techStack: { backend: '', frontend: '', database: '', authentication: '', language: '' },
      dependencies: [],
      devDependencies: [],
      structure: [],
      scripts: [],
      entryPoints: [],
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Project name is required');
  });

  test('should return error for missing techStack', () => {
    const result = validateProjectData({
      name: 'test',
      description: '',
      version: '',
      techStack: undefined as unknown as TechStack,
      dependencies: [],
      devDependencies: [],
      structure: [],
      scripts: [],
      entryPoints: [],
    });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Technology stack information is required');
  });

  test('should pass for valid project data', () => {
    const result = validateProjectData({
      name: 'test-project',
      description: 'A test project',
      version: '1.0.0',
      techStack: {
        backend: 'Express',
        frontend: 'React',
        database: 'MongoDB',
        authentication: 'JWT',
        language: 'TypeScript',
      },
      dependencies: ['express'],
      devDependencies: [],
      structure: ['src'],
      scripts: ['start'],
      entryPoints: ['index.js'],
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe('validateMarkdown', () => {
  test('should reject empty content', () => {
    expect(validateMarkdown('').valid).toBe(false);
  });

  test('should reject content without headings', () => {
    expect(validateMarkdown('plain text no heading').valid).toBe(false);
  });

  test('should reject too short content', () => {
    expect(validateMarkdown('# Hi').valid).toBe(false);
  });

  test('should accept valid markdown', () => {
    const content = '# Heading\n\n'.repeat(20);
    expect(validateMarkdown(content).valid).toBe(true);
  });

  test('should reject non-string input', () => {
    const result = validateMarkdown(null as unknown as string);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('non-empty string');
  });
});

describe('validateFilePath', () => {
  test('should reject empty path', () => {
    expect(validateFilePath('').valid).toBe(false);
  });

  test('should reject invalid characters', () => {
    expect(validateFilePath('file<>.txt').valid).toBe(false);
    expect(validateFilePath('file|name.txt').valid).toBe(false);
    expect(validateFilePath('file?.txt').valid).toBe(false);
  });

  test('should accept valid path', () => {
    expect(validateFilePath('./docs/README.md').valid).toBe(true);
    expect(validateFilePath('/absolute/path/file.txt').valid).toBe(true);
  });
});

describe('validateDocType', () => {
  test('should accept valid doc types', () => {
    expect(validateDocType('readme').valid).toBe(true);
    expect(validateDocType('srs').valid).toBe(true);
    expect(validateDocType('api-docs').valid).toBe(true);
    expect(validateDocType('security').valid).toBe(true);
  });

  test('should reject invalid doc type', () => {
    const result = validateDocType('invalid-type');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid document type');
  });
});

describe('getErrorMessage', () => {
  test('should extract message from Error instance', () => {
    expect(getErrorMessage(new Error('test error'))).toBe('test error');
  });

  test('should return string as-is', () => {
    expect(getErrorMessage('direct string')).toBe('direct string');
  });

  test('should convert non-string values', () => {
    expect(getErrorMessage(42)).toBe('42');
    expect(getErrorMessage(null)).toBe('null');
  });
});
