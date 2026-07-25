import path from 'node:path';
import fs from 'fs-extra';

const fileMap: Record<string, string> = {
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

function getFileName(type: string): string {
  if (type.startsWith('diagram:')) {
    const subtype = type.split(':')[1];
    return `${subtype.toUpperCase()}.md`;
  }
  return fileMap[type] || `${type.toUpperCase()}.md`;
}

function sanitizePath(input: string): string {
  const resolved = path.resolve(input);
  return path.normalize(resolved);
}

export async function writeDoc(
  type: string,
  content: string,
  outputDir = './docs',
  overwrite = false
): Promise<string> {
  const safeDir = sanitizePath(outputDir);
  await fs.ensureDir(safeDir);

  const fileName = getFileName(type);
  const filePath = path.join(safeDir, fileName);

  const exists = await fs.pathExists(filePath);
  if (exists && !overwrite) {
    throw new Error(`${fileName} already exists. Use --overwrite flag to overwrite existing file.`);
  }

  await fs.writeFile(filePath, content, 'utf8');
  return filePath;
}

export async function readFile(filePath: string): Promise<string> {
  return fs.readFile(sanitizePath(filePath), 'utf8');
}

export async function fileExists(filePath: string): Promise<boolean> {
  return fs.pathExists(sanitizePath(filePath));
}

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.ensureDir(sanitizePath(dirPath));
}

export async function deleteFile(filePath: string): Promise<void> {
  await fs.remove(sanitizePath(filePath));
}

export async function listFiles(dirPath: string): Promise<string[]> {
  const safe = sanitizePath(dirPath);
  const exists = await fs.pathExists(safe);
  if (!exists) return [];
  return fs.readdir(safe);
}

export async function getFileStats(filePath: string): Promise<fs.Stats> {
  return fs.stat(sanitizePath(filePath));
}

export async function copyFile(source: string, destination: string): Promise<void> {
  await fs.copy(sanitizePath(source), sanitizePath(destination));
}
