import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, test } from 'vitest';
import { analyzeProject } from '../src/core/analyzer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sampleProjectPath = path.join(__dirname, 'fixtures', 'sample-project');

describe('Project Analyzer', () => {
  test('should detect MERN stack', async () => {
    const result = await analyzeProject(sampleProjectPath);

    expect(result).toBeDefined();
    expect(result.name).toBe('sample-mern-app');
    expect(result.techStack.backend).toBe('Express.js');
    expect(result.techStack.frontend).toBe('React');
    expect(result.techStack.database).toBe('MongoDB');
  });

  test('should handle non-existent project path', async () => {
    const result = await analyzeProject('/nonexistent/path');
    expect(result).toBeDefined();
    expect(typeof result.name).toBe('string');
  });

  test('should extract dependencies correctly', async () => {
    const result = await analyzeProject(sampleProjectPath);

    expect(result.dependencies).toBeInstanceOf(Array);
    expect(result.dependencies.length).toBeGreaterThan(0);
    expect(result.dependencies).toContain('express');
    expect(result.dependencies).toContain('react');
  });

  test('should detect project structure', async () => {
    const result = await analyzeProject(sampleProjectPath);

    expect(result.structure).toBeInstanceOf(Array);
  });

  test('should handle JWT authentication detection', async () => {
    const result = await analyzeProject(sampleProjectPath);

    expect(result.techStack.authentication).toBe('JWT');
  });
});
