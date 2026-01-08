import { callAI } from '../api/client.js';
import {
  buildReadmePrompt,
  buildSRSPrompt,
  buildWorkflowPrompt,
  buildTestCasesPrompt,
  buildArchitecturePrompt,
} from '../templates/index.js';

/**
 * Generates documentation using AI
 * @param {string} type - Document type
 * @param {Object} projectData - Project metadata
 * @param {string} aiProvider - AI provider (gemini/openai)
 * @returns {Promise<string>} Generated documentation
 */
export async function generateDoc(type, projectData, aiProvider = 'gemini') {
  // Build prompt based on type
  const prompt = buildPrompt(type, projectData);

  // Call AI API
  const response = await callAI(prompt, aiProvider);

  // Parse and validate response
  return parseResponse(response);
}

function buildPrompt(type, projectData) {
  switch (type) {
    case 'readme':
      return buildReadmePrompt(projectData);
    case 'srs':
      return buildSRSPrompt(projectData);
    case 'architecture':
      return buildArchitecturePrompt(projectData);
    case 'workflow':
      return buildWorkflowPrompt(projectData);
    case 'testcases':
      return buildTestCasesPrompt(projectData);
    default:
      throw new Error(`Unknown document type: ${type}`);
  }
}

function parseResponse(response) {
  // Basic validation
  if (!response || typeof response !== 'string') {
    throw new Error('Invalid AI response');
  }

  // Ensure it's valid markdown
  if (!response.includes('#')) {
    throw new Error('Response does not appear to be valid Markdown');
  }

  return response.trim();
}
