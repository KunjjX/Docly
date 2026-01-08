import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

/**
 * Write documentation to file
 * @param {string} type - Document type (readme, srs, etc.)
 * @param {string} content - Documentation content
 * @param {string} outputDir - Output directory
 * @returns {Promise<string>} Path to written file
 */
export async function writeDoc(type, content, outputDir = './docs') {
  try {
    // Ensure output directory exists
    await fs.ensureDir(outputDir);

    // Get filename for document type
    const fileName = getFileName(type);
    const filePath = path.join(outputDir, fileName);

    // Check if file already exists
    const exists = await fs.pathExists(filePath);

    if (exists) {
      console.log(chalk.yellow(`\n  Warning: ${fileName} already exists`));
      // In a real implementation, you might want to prompt user here
      // For now, we'll overwrite
    }

    // Write file
    await fs.writeFile(filePath, content, 'utf8');

    return filePath;
  } catch (error) {
    throw new Error(`Failed to write file: ${error.message}`);
  }
}

/**
 * Get filename for document type
 * @param {string} type - Document type
 * @returns {string} Filename
 */
function getFileName(type) {
  const fileMap = {
    readme: 'README.md',
    srs: 'SRS.md',
    architecture: 'ARCHITECTURE.md',
    workflow: 'WORKFLOW.md',
    testcases: 'TEST_CASES.md',
    'api-docs': 'API_DOCS.md',
    setup: 'SETUP.md',
    deploy: 'DEPLOYMENT.md',
    requirements: 'REQUIREMENTS.md',
    security: 'SECURITY.md',
  };

  return fileMap[type] || `${type.toUpperCase()}.md`;
}

/**
 * Read file contents
 * @param {string} filePath - Path to file
 * @returns {Promise<string>} File contents
 */
export async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}

/**
 * Check if file exists
 * @param {string} filePath - Path to file
 * @returns {Promise<boolean>} True if exists
 */
export async function fileExists(filePath) {
  return await fs.pathExists(filePath);
}

/**
 * Ensure directory exists
 * @param {string} dirPath - Directory path
 */
export async function ensureDir(dirPath) {
  await fs.ensureDir(dirPath);
}

/**
 * Delete file
 * @param {string} filePath - Path to file
 */
export async function deleteFile(filePath) {
  try {
    await fs.remove(filePath);
  } catch (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

/**
 * List files in directory
 * @param {string} dirPath - Directory path
 * @returns {Promise<string[]>} Array of filenames
 */
export async function listFiles(dirPath) {
  try {
    const exists = await fs.pathExists(dirPath);
    if (!exists) {
      return [];
    }
    return await fs.readdir(dirPath);
  } catch (error) {
    throw new Error(`Failed to list files: ${error.message}`);
  }
}

/**
 * Get file stats
 * @param {string} filePath - Path to file
 * @returns {Promise<Object>} File stats
 */
export async function getFileStats(filePath) {
  try {
    return await fs.stat(filePath);
  } catch (error) {
    throw new Error(`Failed to get file stats: ${error.message}`);
  }
}

/**
 * Copy file
 * @param {string} source - Source path
 * @param {string} destination - Destination path
 */
export async function copyFile(source, destination) {
  try {
    await fs.copy(source, destination);
  } catch (error) {
    throw new Error(`Failed to copy file: ${error.message}`);
  }
}
