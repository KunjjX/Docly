import { callAI } from '../api/client.js';
import {
  buildApiDocsPrompt,
  buildArchitecturePrompt,
  buildDeployPrompt,
  buildDiagramPrompt,
  buildReadmePrompt,
  buildRequirementsPrompt,
  buildSecurityPrompt,
  buildSetupPrompt,
  buildSRSPrompt,
  buildTestCasesPrompt,
  buildWorkflowPrompt,
} from '../templates/index.js';
import type { CLIOptions, ProjectData } from '../types';

type PromptBuilder = (projectData: ProjectData, options?: CLIOptions) => string;

const promptBuilders: Record<string, PromptBuilder> = {
  readme: buildReadmePrompt,
  srs: buildSRSPrompt,
  architecture: buildArchitecturePrompt,
  workflow: buildWorkflowPrompt,
  testcases: buildTestCasesPrompt,
  diagram: buildDiagramPrompt,
  'api-docs': buildApiDocsPrompt,
  setup: buildSetupPrompt,
  deploy: buildDeployPrompt,
  security: buildSecurityPrompt,
  requirements: buildRequirementsPrompt,
};

export function buildPrompt(
  type: string,
  projectData: ProjectData,
  options: CLIOptions = {}
): string {
  const builder = promptBuilders[type];
  if (!builder) {
    throw new Error(`Unknown document type: ${type}`);
  }
  return builder(projectData, options);
}

export function stripCodeFences(content: string): string {
  return content
    .replace(/^```[\w-]*\s*\n/gm, '')
    .replace(/\n```\s*$/gm, '')
    .replace(/^```\s*$/gm, '')
    .trim();
}

export function parseResponse(response: string, type: string): string {
  if (!response || typeof response !== 'string') {
    throw new Error('Invalid AI response');
  }

  const content = stripCodeFences(response);

  if (type !== 'diagram' && !content.includes('#')) {
    throw new Error('Response does not appear to be valid Markdown');
  }

  if (type !== 'diagram' && content.length < 10) {
    throw new Error('Content is too short to be valid documentation');
  }

  return content.trim();
}

export async function generateDoc(
  type: string,
  projectData: ProjectData,
  options: CLIOptions = {}
): Promise<string> {
  const prompt = buildPrompt(type, projectData, options);
  const aiProvider = options.ai || 'gemini';
  const response = await callAI(prompt, aiProvider);
  return parseResponse(response, type);
}
