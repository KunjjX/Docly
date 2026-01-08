import { writeDoc, readFile, fileExists } from '../src/utils/fileUtils.js';
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import fs from 'fs-extra';
import path from 'path';

const testOutputDir = './tests/output';

describe('File Utils', () => {
  beforeEach(async () => {
    await fs.ensureDir(testOutputDir);
  });

  afterEach(async () => {
    await fs.remove(testOutputDir);
  });

  describe('writeDoc', () => {
    test('should write README file', async () => {
      const content = '# Test README\n\nThis is a test.';
      const filePath = await writeDoc('readme', content, testOutputDir);

      expect(filePath).toContain('README.md');

      const exists = await fileExists(filePath);
      expect(exists).toBe(true);
    });

    test('should create output directory if not exists', async () => {
      const newDir = './tests/new-output';
      await writeDoc('readme', '# Test', newDir);

      const exists = await fs.pathExists(newDir);
      expect(exists).toBe(true);

      await fs.remove(newDir);
    });

    test('should write SRS file', async () => {
      const content = '# Software Requirements Specification';
      const filePath = await writeDoc('srs', content, testOutputDir);

      expect(filePath).toContain('SRS.md');
    });
  });

  describe('readFile', () => {
    test('should read file contents', async () => {
      const content = '# Test Content';
      const filePath = await writeDoc('readme', content, testOutputDir);

      const readContent = await readFile(filePath);
      expect(readContent).toBe(content);
    });

    test('should throw error for non-existent file', async () => {
      await expect(readFile('./nonexistent.md')).rejects.toThrow();
    });
  });

  describe('fileExists', () => {
    test('should return true for existing file', async () => {
      const filePath = await writeDoc('readme', '# Test', testOutputDir);
      const exists = await fileExists(filePath);

      expect(exists).toBe(true);
    });

    test('should return false for non-existing file', async () => {
      const exists = await fileExists('./nonexistent.md');

      expect(exists).toBe(false);
    });
  });
});
