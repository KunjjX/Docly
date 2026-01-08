import fs from 'fs-extra';
import path from 'path';

/**
 * Analyzes a project and extracts metadata
 * @param {string} projectPath - Path to project root
 * @returns {Promise<Object>} Project metadata
 */
export async function analyzeProject(projectPath = process.cwd()) {
  try {
    // Read package.json
    const packageJsonPath = path.join(projectPath, 'package.json');

    if (!(await fs.pathExists(packageJsonPath))) {
      throw new Error('package.json not found. Is this a Node.js project?');
    }

    const packageJson = await fs.readJson(packageJsonPath);

    // Detect tech stack
    const techStack = {
      backend: detectBackend(packageJson),
      frontend: detectFrontend(packageJson),
      database: detectDatabase(packageJson),
      authentication: detectAuth(packageJson),
    };

    // Scan folder structure
    const structure = await scanStructure(projectPath);

    return {
      name: packageJson.name || 'Unnamed Project',
      description: packageJson.description || 'No description provided',
      version: packageJson.version || '1.0.0',
      techStack,
      dependencies: Object.keys(packageJson.dependencies || {}),
      devDependencies: Object.keys(packageJson.devDependencies || {}),
      structure,
      scripts: Object.keys(packageJson.scripts || {}),
    };
  } catch (error) {
    throw new Error(`Failed to analyze project: ${error.message}`);
  }
}

function detectBackend(packageJson) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.express) return 'Express.js';
  if (deps.fastify) return 'Fastify';
  if (deps['@nestjs/core']) return 'NestJS';
  if (deps.koa) return 'Koa';
  return 'Node.js';
}

function detectFrontend(packageJson) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.next) return 'Next.js';
  if (deps.react) return 'React';
  if (deps.vue) return 'Vue.js';
  if (deps['@angular/core']) return 'Angular';
  if (deps.svelte) return 'Svelte';
  return 'None';
}

function detectDatabase(packageJson) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.mongoose) return 'MongoDB';
  if (deps.pg || deps['pg-promise']) return 'PostgreSQL';
  if (deps.mysql || deps.mysql2) return 'MySQL';
  if (deps.sqlite3) return 'SQLite';
  return 'None';
}

function detectAuth(packageJson) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.jsonwebtoken) return 'JWT';
  if (deps.passport) return 'Passport.js';
  if (deps['@auth0/auth0-react']) return 'Auth0';
  if (deps['next-auth']) return 'NextAuth';
  return 'None';
}

async function scanStructure(projectPath) {
  const ignoreDirs = ['node_modules', '.git', 'dist', 'build', 'coverage'];
  const topLevelDirs = await fs.readdir(projectPath);

  const structure = [];

  for (const item of topLevelDirs) {
    if (ignoreDirs.includes(item) || item.startsWith('.')) continue;

    const itemPath = path.join(projectPath, item);
    const stats = await fs.stat(itemPath);

    if (stats.isDirectory()) {
      structure.push(item);
    }
  }

  return structure;
}
