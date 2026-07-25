import axios from 'axios';
import config from '../utils/config';
import { getErrorMessage } from '../utils/validator.js';

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY not found in environment variables. Please set it in .env file.'
    );
  }

  const model = config.get('geminiModel');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const timeout = config.get('apiTimeout');

  try {
    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        timeout,
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Invalid response from Gemini API');
    }

    return text;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const data = error.response.data as Record<string, unknown>;
      const errorObj = data?.error as Record<string, unknown> | undefined;

      if (
        status === 403 ||
        status === 401 ||
        (errorObj?.details as Array<{ reason: string }> | undefined)?.[0]?.reason ===
          'API_KEY_INVALID'
      ) {
        throw new Error(
          'GEMINI_API_KEY is invalid. Please get a valid key from https://aistudio.google.com/app/apikey'
        );
      }

      throw new Error(
        `Gemini API error (${status}): ${(errorObj?.message as string) || error.response.statusText}`
      );
    }

    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      throw new Error('Gemini API timeout - request took too long');
    }

    throw new Error(`Network error: ${getErrorMessage(error)}`);
  }
}

async function callOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY not found in environment variables. Please set it in .env file.'
    );
  }

  const model = config.get('openaiModel');
  const url = 'https://api.openai.com/v1/chat/completions';
  const timeout = config.get('apiTimeout');

  try {
    const response = await axios.post(
      url,
      {
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are a senior software architect and technical writer. Generate clear, professional documentation in Markdown format.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        timeout,
      }
    );

    const content = response.data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid response from OpenAI API');
    }

    return content;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`OpenAI API error: ${error.response.status} - ${error.response.statusText}`);
    }
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      throw new Error('OpenAI API timeout');
    }
    throw new Error(`Network error: ${getErrorMessage(error)}`);
  }
}

export async function callAI(prompt: string, provider: string = 'gemini'): Promise<string> {
  const maxRetries = config.get('maxRetries');
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (provider === 'gemini') {
        return await callGemini(prompt);
      }
      if (provider === 'openai') {
        return await callOpenAI(prompt);
      }
      throw new Error(`Unknown AI provider: ${provider}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries) {
        await sleep(2000 * attempt);
      }
    }
  }

  throw new Error(`AI API failed after ${maxRetries} attempts: ${lastError?.message}`);
}
