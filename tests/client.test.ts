import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const { mockPost, mockIsAxiosError } = vi.hoisted(() => {
  return {
    mockPost: vi.fn(),
    mockIsAxiosError: vi.fn(
      (payload: unknown) =>
        typeof payload === 'object' && payload !== null && 'isAxiosError' in payload
    ),
  };
});

vi.mock('axios', () => ({
  default: {
    post: mockPost,
    isAxiosError: mockIsAxiosError,
  },
}));

describe('API Client', () => {
  let callAI: (prompt: string, provider?: string) => Promise<string>;

  beforeEach(async () => {
    process.env.GEMINI_API_KEY = 'test-gemini-key';
    process.env.OPENAI_API_KEY = 'test-openai-key';
    process.env.MAX_RETRIES = '2';
    mockPost.mockClear();
    mockIsAxiosError.mockClear();

    vi.resetModules();
    const clientMod = await import('../src/api/client.js');
    callAI = clientMod.callAI;
  });

  afterEach(() => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    delete process.env.MAX_RETRIES;
  });

  describe('callAI with Gemini', () => {
    test('should return AI response on success', async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          candidates: [{ content: { parts: [{ text: '# Generated documentation' }] } }],
        },
      });

      const result = await callAI('test prompt', 'gemini');

      expect(result).toBe('# Generated documentation');
      expect(mockPost).toHaveBeenCalledTimes(1);
      const callUrl = mockPost.mock.calls[0][0];
      expect(callUrl).toContain('generativelanguage.googleapis.com');
      expect(callUrl).not.toContain('?key=');
      expect(mockPost.mock.calls[0][2]?.headers).toHaveProperty(
        'x-goog-api-key',
        'test-gemini-key'
      );
    });

    test('should throw on missing GEMINI_API_KEY', async () => {
      delete process.env.GEMINI_API_KEY;
      vi.resetModules();
      const mod = await import('../src/api/client.js');
      await expect(mod.callAI('prompt', 'gemini')).rejects.toThrow('GEMINI_API_KEY not found');
    });

    test('should handle invalid API key error', async () => {
      const err = new Error('Forbidden') as Error & {
        isAxiosError: boolean;
        response: object;
        status?: number;
      };
      err.isAxiosError = true;
      err.response = {
        status: 403,
        data: { error: { message: 'API key not valid' } },
        statusText: 'Forbidden',
      };
      mockPost.mockRejectedValue(err);

      await expect(callAI('prompt', 'gemini')).rejects.toThrow('GEMINI_API_KEY is invalid');
    });

    test('should retry on failure', async () => {
      const timeoutErr = new Error('timeout') as Error & { isAxiosError: boolean; code: string };
      timeoutErr.isAxiosError = true;
      timeoutErr.code = 'ECONNABORTED';
      mockPost.mockRejectedValueOnce(timeoutErr).mockResolvedValueOnce({
        data: {
          candidates: [{ content: { parts: [{ text: '# Success after retry' }] } }],
        },
      });

      const result = await callAI('prompt', 'gemini');

      expect(result).toBe('# Success after retry');
      expect(mockPost).toHaveBeenCalledTimes(2);
    });

    test('should throw after exhausting retries', async () => {
      const serverErr = new Error('Server error') as Error & {
        isAxiosError: boolean;
        response: object;
      };
      serverErr.isAxiosError = true;
      serverErr.response = { status: 500, data: {}, statusText: 'Internal Server Error' };
      mockPost.mockRejectedValue(serverErr);

      await expect(callAI('prompt', 'gemini')).rejects.toThrow('AI API failed');
    });
  });

  describe('callAI with OpenAI', () => {
    test('should return AI response on success', async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          choices: [{ message: { content: '# OpenAI documentation' } }],
        },
      });

      const result = await callAI('test prompt', 'openai');

      expect(result).toBe('# OpenAI documentation');
      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost.mock.calls[0][1]).toHaveProperty('model', 'gpt-4');
    });

    test('should throw on missing OPENAI_API_KEY', async () => {
      delete process.env.OPENAI_API_KEY;
      vi.resetModules();
      const mod = await import('../src/api/client.js');
      await expect(mod.callAI('prompt', 'openai')).rejects.toThrow('OPENAI_API_KEY not found');
    });
  });

  describe('callAI with unknown provider', () => {
    test('should throw for unknown provider', async () => {
      vi.resetModules();
      const mod = await import('../src/api/client.js');
      await expect(mod.callAI('prompt', 'unknown')).rejects.toThrow('Unknown AI provider');
    });
  });
});
