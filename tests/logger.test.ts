import { afterEach, describe, expect, test, vi } from 'vitest';

describe('Logger', () => {
  let logSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    delete process.env.LOG_LEVEL;
  });

  test('should log success message', async () => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const mod = await import('../src/utils/logger.js');
    mod.default.success('Test success');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Test success'));
  });

  test('should log error message', async () => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const mod = await import('../src/utils/logger.js');
    mod.default.error('Test error');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Test error'));
  });

  test('should log info message at default level', async () => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const mod = await import('../src/utils/logger.js');
    mod.default.info('Test info');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Test info'));
  });

  test('should not log debug at info level', async () => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const mod = await import('../src/utils/logger.js');
    mod.default.debug('Test debug');
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('should log debug at debug level', async () => {
    process.env.LOG_LEVEL = 'debug';
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const mod = await import('../src/utils/logger.js');
    mod.default.debug('Test debug');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Test debug'));
  });

  test('should log section', async () => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const mod = await import('../src/utils/logger.js');
    mod.default.section('Test Section');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Test Section'));
  });

  test('should respect log level filtering', async () => {
    process.env.LOG_LEVEL = 'error';
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const mod = await import('../src/utils/logger.js');
    mod.default.info('Should not appear');
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('warn log at warn level', async () => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const mod = await import('../src/utils/logger.js');
    mod.default.warn('Test warn');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Test warn'));
  });
});
