import path from 'node:path';
import fs from 'fs-extra';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const testConfigPath = path.join(process.cwd(), 'docly.config.json');

async function freshConfig() {
  vi.resetModules();
  const mod = await import('../src/utils/config.js');
  return mod.default;
}

describe('Config', () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test-key';
    process.env.OPENAI_API_KEY = 'test-openai-key';
  });

  afterEach(async () => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    delete process.env.AI_PROVIDER;
    delete process.env.OUTPUT_DIR;
    delete process.env.MAX_RETRIES;
    delete process.env.GEMINI_MODEL;
    delete process.env.OPENAI_MODEL;
    await fs.remove(testConfigPath).catch(() => {});
  });

  test('should load default config values', async () => {
    const config = await freshConfig();
    expect(config.get('outputDir')).toBe('./docs');
    expect(config.get('aiProvider')).toBe('gemini');
    expect(config.get('maxRetries')).toBe(3);
    expect(config.get('apiTimeout')).toBe(30000);
    expect(config.get('geminiModel')).toBe('gemini-2.0-flash');
    expect(config.get('openaiModel')).toBe('gpt-4');
  });

  test('should override defaults with env vars', async () => {
    process.env.AI_PROVIDER = 'openai';
    process.env.OUTPUT_DIR = './my-docs';
    process.env.MAX_RETRIES = '5';
    process.env.GEMINI_MODEL = 'gemini-2.0-pro';

    const config = await freshConfig();
    expect(config.get('aiProvider')).toBe('openai');
    expect(config.get('outputDir')).toBe('./my-docs');
    expect(config.get('maxRetries')).toBe(5);
    expect(config.get('geminiModel')).toBe('gemini-2.0-pro');
  });

  test('should load project config file', async () => {
    await fs.writeJson(testConfigPath, {
      outputDir: './project-docs',
      aiProvider: 'openai',
      maxRetries: 7,
    });

    const config = await freshConfig();
    expect(config.get('outputDir')).toBe('./project-docs');
    expect(config.get('aiProvider')).toBe('openai');
    expect(config.get('maxRetries')).toBe(7);
  });

  test('validate should return valid when API key is set', async () => {
    const config = await freshConfig();
    const result = config.validate();
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('validate should return error when Gemini API key missing', async () => {
    delete process.env.GEMINI_API_KEY;
    const config = await freshConfig();
    const result = config.validate();
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('GEMINI_API_KEY is required when using Gemini provider');
  });

  test('getAll should return a copy of all config', async () => {
    const config = await freshConfig();
    const all = config.getAll();
    expect(all).toHaveProperty('outputDir');
    expect(all).toHaveProperty('aiProvider');
    expect(all).toHaveProperty('geminiModel');
    expect(all).toHaveProperty('openaiModel');
  });
});
