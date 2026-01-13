import axios from 'axios';

// Note: dotenv is loaded in bin/index.js before this module is imported

/**
 * Calls AI API to generate documentation
 * @param {string} prompt - Prompt for AI
 * @param {string} provider - AI provider (gemini/openai)
 * @returns {Promise<string>} Generated content
 */
export async function callAI(prompt, provider = 'gemini') {
  const maxRetries = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (provider === 'gemini') {
        return await callGemini(prompt);
      } else if (provider === 'openai') {
        return await callOpenAI(prompt);
      } else {
        throw new Error(`Unknown AI provider: ${provider}`);
      }
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries) {
        // Wait before retry (exponential backoff)
        await sleep(2000 * attempt);
      }
    }
  }

  throw new Error(`AI API failed after ${maxRetries} attempts: ${lastError.message}`);
}

/**
 * Call Google Gemini API
 */
async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY not found in environment variables. Please set it in .env file.'
    );
  }

  // Use v1beta with gemini-2.5-flash (most stable and widely available)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
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
        },
        timeout: 60000, // Increased timeout to 60s
      }
    );

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (error.response) {
      const errorData = error.response.data;

      // Check for specific error types
      if (
        errorData?.error?.message?.includes('API key not valid') ||
        errorData?.error?.details?.[0]?.reason === 'API_KEY_INVALID'
      ) {
        throw new Error(
          'GEMINI_API_KEY is invalid. Please get a valid key from https://aistudio.google.com/app/apikey'
        );
      }

      throw new Error(
        `Gemini API error (${error.response.status}): ${errorData?.error?.message || error.response.statusText}`
      );
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Gemini API timeout - request took too long');
    } else {
      throw new Error(`Network error: ${error.message}`);
    }
  }
}

/**
 * Call OpenAI API
 */
async function callOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY not found in environment variables. Please set it in .env file.'
    );
  }

  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await axios.post(
      url,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You are a senior software architect and technical writer. Generate clear, professional documentation in Markdown format.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 60000,
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI API');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      throw new Error(`OpenAI API error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('OpenAI API timeout');
    } else {
      throw new Error(`Network error: ${error.message}`);
    }
  }
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
