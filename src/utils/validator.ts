import type { DocType, ProjectData } from '../types';

export function validateProjectData(projectData: ProjectData | null): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!projectData) {
    errors.push('Project data is required');
    return { valid: false, errors };
  }

  if (!projectData.name || projectData.name.trim() === '') {
    errors.push('Project name is required');
  }

  if (!projectData.techStack) {
    errors.push('Technology stack information is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateMarkdown(content: string): { valid: boolean; error?: string } {
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'Content must be a non-empty string' };
  }

  if (!content.includes('#')) {
    return { valid: false, error: 'Content must contain markdown headings' };
  }

  if (content.length < 100) {
    return { valid: false, error: 'Content is too short to be valid documentation' };
  }

  return { valid: true };
}

export function validateFilePath(filePath: string): { valid: boolean; error?: string } {
  if (!filePath || typeof filePath !== 'string') {
    return { valid: false, error: 'File path must be a string' };
  }

  const invalidChars = /[<>:"|?*]/;
  if (invalidChars.test(filePath)) {
    return { valid: false, error: 'File path contains invalid characters' };
  }

  return { valid: true };
}

const validTypes: DocType[] = [
  'readme',
  'srs',
  'architecture',
  'workflow',
  'testcases',
  'api-docs',
  'setup',
  'deploy',
  'requirements',
  'security',
  'diagram',
];

export function validateDocType(type: string): { valid: boolean; error?: string } {
  if (!validTypes.includes(type as DocType)) {
    return {
      valid: false,
      error: `Invalid document type. Must be one of: ${validTypes.join(', ')}`,
    };
  }
  return { valid: true };
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return String(error);
}
