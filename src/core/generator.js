import { callAI } from '../api/client.js';
import {
  buildReadmePrompt,
  buildSRSPrompt,
  buildWorkflowPrompt,
  buildTestCasesPrompt,
  buildArchitecturePrompt,
  buildDiagramPrompt,
  buildApiDocsPrompt,
  buildSetupPrompt,
  buildDeployPrompt,
  buildSecurityPrompt,
  buildRequirementsPrompt,
} from '../templates/index.js';


/**
 * Generates documentation using AI
 * @param {string} type - Document type
 * @param {Object} projectData - Project metadata
 * @param {Object} options - Options including aiProvider and diagramType
 * @returns {Promise<string>} Generated documentation
 */
export async function generateDoc(type, projectData, options = {}) {
  // Build prompt based on type
  const prompt = buildPrompt(type, projectData, options);

  const aiProvider = options.ai || 'gemini';

  // Call AI API
  const response = await callAI(prompt, aiProvider);

  // Parse and validate response
  return parseResponse(response, type);
}

function buildPrompt(type, projectData, options = {}) {
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
    case 'diagram':
      return buildDiagramPrompt(projectData, options.diagramType);
    case 'api-docs':
      return buildApiDocsPrompt(projectData);
    case 'setup':
      return buildSetupPrompt(projectData);
    case 'deploy':
      return buildDeployPrompt(projectData);
    case 'security':
      return buildSecurityPrompt(projectData);
    case 'requirements':
      return buildRequirementsPrompt(projectData);
    default:
      throw new Error(`Unknown document type: ${type}`);
  }
}

function parseResponse(response, type) {
  // Basic validation
  if (!response || typeof response !== 'string') {
    throw new Error('Invalid AI response');
  }

  // Ensure it's valid markdown (skip for diagram)
  if (type !== 'diagram' && !response.includes('#')) {
    throw new Error('Response does not appear to be valid Markdown');
  }

  return response.trim();
}
