import { analyzeProject } from '../src/core/analyzer.js';
import { describe, test, expect, beforeAll } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Project Analyzer', () => {
  const sampleProjectPath = path.join(__dirname, 'fixtures', 'sample-project');

  test('should detect MERN stack', async () => {
    const result = await analyzeProject(sampleProjectPath);

    expect(result).toBeDefined();
    expect(result.name).toBe('sample-mern-app');
    expect(result.techStack.backend).toBe('Express.js');
    expect(result.techStack.frontend).toBe('React');
    expect(result.techStack.database).toBe('MongoDB');
  });

  test('should throw error for missing package.json', async () => {
    await expect(analyzeProject('/nonexistent/path')).rejects.toThrow('package.json not found');
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
    expect(result.structure.length).toBeGreaterThan(0);
  });

  test('should handle JWT authentication detection', async () => {
    const result = await analyzeProject(sampleProjectPath);

    expect(result.techStack.authentication).toBe('JWT');
  });
});

describe('Tech Stack Detection', () => {
  test('should detect Next.js', async () => {
    // Test with Next.js project fixture
    // Implementation depends on test fixtures
  });

  test('should detect PostgreSQL', async () => {
    // Test with PostgreSQL project fixture
  });
});
