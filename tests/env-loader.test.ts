import { afterEach, describe, expect, test, vi } from 'vitest';

describe('env-loader', () => {
  afterEach(() => {
    vi.resetModules();
  });

  test('should call loadEnv on import', async () => {
    const dotenvSpy = vi.fn(() => ({ parsed: {} }));
    vi.doMock('dotenv', () => ({
      default: { config: dotenvSpy },
    }));

    await import('../src/utils/env-loader.js');
    expect(dotenvSpy).toHaveBeenCalled();
  });

  test('should produce no error when .env exists', async () => {
    vi.doMock('dotenv', () => ({
      default: {
        config: () => ({ parsed: { GEMINI_API_KEY: 'test' } }),
      },
    }));

    const mod = await import('../src/utils/env-loader.js');
    expect(mod.env).toBeDefined();
  });

  test('should warn when .env file is missing', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    vi.doMock('dotenv', () => ({
      default: {
        config: () => ({ error: new Error('ENOENT') }),
      },
    }));

    await import('../src/utils/env-loader.js');
    expect(consoleSpy).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('No .env file found'),
      expect.any(String)
    );
    consoleSpy.mockRestore();
  });

  test('should not call loadEnv twice', async () => {
    const dotenvSpy = vi.fn(() => ({ parsed: {} }));
    vi.doMock('dotenv', () => ({
      default: { config: dotenvSpy },
    }));

    await import('../src/utils/env-loader.js');

    const { loadEnv } = await import('../src/utils/env-loader.js');
    loadEnv();
    loadEnv();
    loadEnv();

    expect(dotenvSpy).toHaveBeenCalledTimes(1);
  });
});
