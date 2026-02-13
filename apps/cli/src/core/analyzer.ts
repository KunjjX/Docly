import fs from 'fs-extra';
import path from 'path';

interface PackageJson {
  name?: string;
  description?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
  main?: string;
}

/**
 * Analyzes a project and extracts metadata
 * @param projectPath - Path to project root
 * @returns Project metadata
 */
export async function analyzeProject(projectPath = process.cwd()) {
  try {
    // Read package.json
    const packageJsonPath = path.join(projectPath, 'package.json');
    let packageJson: PackageJson = {};

    if (await fs.pathExists(packageJsonPath)) {
      packageJson = await fs.readJson(packageJsonPath);
    }

    // Detect tech stack
    const techStack = {
      backend: detectBackend(packageJson),
      frontend: detectFrontend(packageJson),
      database: detectDatabase(packageJson),
      authentication: detectAuth(packageJson),
      language: detectLanguage(projectPath, packageJson),
    };

    // Scan folder structure
    const structure = await scanStructure(projectPath);

    // Detect entry points
    const entryPoints = await detectEntryPoints(projectPath, packageJson);

    return {
      name: packageJson.name || path.basename(projectPath) || 'Unnamed Project',
      description: packageJson.description || 'No description provided',
      version: packageJson.version || '1.0.0',
      techStack,
      dependencies: Object.keys(packageJson.dependencies || {}),
      devDependencies: Object.keys(packageJson.devDependencies || {}),
      structure,
      scripts: Object.keys(packageJson.scripts || {}),
      entryPoints,
    };
  } catch (error: any) {
    throw new Error(`Failed to analyze project: ${error.message}`);
  }
}

function detectBackend(packageJson: any) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.express) return 'Express';
  if (deps.fastify) return 'Fastify';
  if (deps['@nestjs/core']) return 'NestJS';
  if (deps.koa) return 'Koa';
  if (deps.hapi) return 'Hapi';
  if (deps.strapi) return 'Strapi';
  if (deps['@adonisjs/core']) return 'AdonisJS';
  return 'Node';
}

function detectFrontend(packageJson: any) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.next) return 'Next';
  if (deps.react) return 'React';
  if (deps.vue) return 'Vue';
  if (deps['@angular/core']) return 'Angular';
  if (deps.svelte) return 'Svelte';
  if (deps.nuxt) return 'Nuxt';
  if (deps.astro) return 'Astro';
  if (deps.remix) return 'Remix';
  return 'None';
}

function detectDatabase(packageJson: any) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.mongoose) return 'MongoDB';
  if (deps.pg || deps['pg-promise'] || deps.sequelize) return 'PostgreSQL/MySQL';
  if (deps.mysql || deps.mysql2) return 'MySQL';
  if (deps.sqlite3 || deps.better_sqlite3) return 'SQLite';
  if (deps['@prisma/client']) return 'Prisma (Database client)';
  if (deps.firebase) return 'Firebase';
  if (deps.supabase) return 'Supabase';
  return 'None';
}

function detectAuth(packageJson: any) {
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.jsonwebtoken) return 'JWT';
  if (deps.passport) return 'Passport';
  if (deps['@auth0/auth0-react']) return 'Auth0';
  if (deps['next-auth']) return 'NextAuth';
  if (deps.firebase) return 'Firebase Auth';
  if (deps['@clerk/nextjs']) return 'Clerk';
  return 'None';
}

function detectLanguage(projectPath: string, packageJson: PackageJson) {
  const deps: Record<string, string> = { ...packageJson.dependencies, ...packageJson.devDependencies };
  if (deps.typescript || fs.existsSync(path.join(projectPath, 'tsconfig.json'))) {
    return 'TypeScript';
  }
  return 'JavaScript';
}

async function detectEntryPoints(projectPath: string, packageJson: PackageJson) {
  const commonEntries = [
    'src/index',
    'src/main',
    'src/app',
    'index',
    'app',
    'src/index.ts',
    'src/main.ts',
    'src/app.ts',
    'bin/index'
  ];

  const entries = [];

  // Check package.json main
  if (packageJson.main && (await fs.pathExists(path.join(projectPath, packageJson.main)))) {
    entries.push(packageJson.main);
  }

  // Check common entries
  for (const entry of commonEntries) {
    if (!entries.includes(entry) && (await fs.pathExists(path.join(projectPath, entry)))) {
      entries.push(entry);
    }
  }

  return entries;
}

async function scanStructure(projectPath: any) {
  const ignoreDirs = ['node_modules', '.git', 'dist', 'build', 'coverage', '.next'];

  if (!(await fs.pathExists(projectPath)) || !(await fs.stat(projectPath)).isDirectory()) {
    return [];
  }

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
