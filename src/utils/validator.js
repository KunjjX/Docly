/**
 * Validates project data before generation
 */
export function validateProjectData(projectData) {
  const errors = [];

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

/**
 * Validates markdown content
 */
export function validateMarkdown(content) {
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'Content must be a non-empty string' };
  }

  // Check for basic markdown structure
  if (!content.includes('#')) {
    return { valid: false, error: 'Content must contain markdown headings' };
  }

  // Check minimum length
  if (content.length < 100) {
    return { valid: false, error: 'Content is too short to be valid documentation' };
  }

  return { valid: true };
}

/**
 * Validates file path
 */
export function validateFilePath(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    return { valid: false, error: 'File path must be a string' };
  }

  // Check for invalid characters
  const invalidChars = /[<>:"|?*]/;
  if (invalidChars.test(filePath)) {
    return { valid: false, error: 'File path contains invalid characters' };
  }

  return { valid: true };
}

/**
 * Validates document type
 */
export function validateDocType(type) {
  const validTypes = [
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
  ];

  if (!validTypes.includes(type)) {
    return {
      valid: false,
      error: `Invalid document type. Must be one of: ${validTypes.join(', ')}`,
    };
  }

  return { valid: true };
}
