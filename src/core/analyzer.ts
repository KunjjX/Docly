import path from 'node:path';
import fs from 'fs-extra';
import type { ProjectData, ProjectType, TechStack } from '../types';
import { getErrorMessage } from '../utils/validator.js';

function detectBackend(deps: Record<string, string>, projectType: ProjectType): string {
  if (projectType === 'python') return 'Python (Flask/Django)';
  if (projectType === 'go') return 'Go';
  if (projectType === 'rust') return 'Rust';
  if (projectType === 'java') return 'Java';
  if (projectType === 'ruby') return 'Ruby';
  if (deps.express) return 'Express.js';
  if (deps.fastify) return 'Fastify';
  if (deps['@nestjs/core']) return 'NestJS';
  if (deps.koa) return 'Koa';
  if (deps.hapi) return 'Hapi';
  if (deps.strapi) return 'Strapi';
  if (deps['@adonisjs/core']) return 'AdonisJS';
  return 'Node.js';
}

function detectFrontend(deps: Record<string, string>): string {
  if (deps.next) return 'Next.js';
  if (deps.react) return 'React';
  if (deps.vue) return 'Vue.js';
  if (deps['@angular/core']) return 'Angular';
  if (deps.svelte) return 'Svelte';
  if (deps.nuxt) return 'Nuxt.js';
  if (deps.astro) return 'Astro';
  if (deps.remix) return 'Remix';
  return 'None';
}

function detectDatabase(deps: Record<string, string>, projectType: ProjectType): string {
  if (projectType === 'python') {
    if (deps.Django || deps.django) return 'Django ORM';
    return 'SQLAlchemy';
  }
  if (deps.mongoose) return 'MongoDB';
  if (deps.pg || deps['pg-promise'] || deps.sequelize) return 'PostgreSQL/MySQL';
  if (deps.mysql || deps.mysql2) return 'MySQL';
  if (deps.sqlite3 || deps.better_sqlite3) return 'SQLite';
  if (deps['@prisma/client']) return 'Prisma (Database client)';
  if (deps.firebase) return 'Firebase';
  if (deps.supabase) return 'Supabase';
  return 'None';
}

function detectAuth(deps: Record<string, string>, projectType: ProjectType): string {
  if (projectType === 'python') return 'Django Auth / Flask-Login';
  if (deps.jsonwebtoken) return 'JWT';
  if (deps.passport) return 'Passport.js';
  if (deps['@auth0/auth0-react']) return 'Auth0';
  if (deps['next-auth']) return 'NextAuth';
  if (deps.firebase) return 'Firebase Auth';
  if (deps['@clerk/nextjs']) return 'Clerk';
  return 'None';
}

async function detectProjectType(projectPath: string): Promise<ProjectType> {
  if (await fs.pathExists(path.join(projectPath, 'package.json'))) return 'node';
  if (await fs.pathExists(path.join(projectPath, 'requirements.txt'))) return 'python';
  if (await fs.pathExists(path.join(projectPath, 'pyproject.toml'))) return 'python';
  if (await fs.pathExists(path.join(projectPath, 'setup.py'))) return 'python';
  if (await fs.pathExists(path.join(projectPath, 'go.mod'))) return 'go';
  if (await fs.pathExists(path.join(projectPath, 'Cargo.toml'))) return 'rust';
  if (await fs.pathExists(path.join(projectPath, 'pom.xml'))) return 'java';
  if (await fs.pathExists(path.join(projectPath, 'build.gradle'))) return 'java';
  if (await fs.pathExists(path.join(projectPath, 'Gemfile'))) return 'ruby';
  return 'node';
}

async function parseRequirementsTxt(projectPath: string): Promise<Record<string, string>> {
  try {
    const content = await fs.readFile(path.join(projectPath, 'requirements.txt'), 'utf-8');
    const deps: Record<string, string> = {};
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const match = trimmed.match(/^([a-zA-Z0-9_.-]+)/);
        if (match) deps[match[1].toLowerCase()] = '*';
      }
    }
    return deps;
  } catch {
    return {};
  }
}

function detectLanguageFromProjectType(projectType: ProjectType): string {
  if (projectType === 'python') return 'Python';
  if (projectType === 'go') return 'Go';
  if (projectType === 'rust') return 'Rust';
  if (projectType === 'java') return 'Java';
  if (projectType === 'ruby') return 'Ruby';
  return 'JavaScript';
}

function detectLanguage(projectPath: string, deps: Record<string, string>): string {
  if (deps.typescript || fs.existsSync(path.join(projectPath, 'tsconfig.json'))) {
    return 'TypeScript';
  }
  return 'JavaScript';
}

async function detectEntryPoints(
  projectPath: string,
  packageJson: { main?: string }
): Promise<string[]> {
  const commonEntries = [
    'src/index.js',
    'src/main.js',
    'src/app.js',
    'index.js',
    'app.js',
    'src/index.ts',
    'src/main.ts',
    'src/app.ts',
    'bin/index.js',
  ];

  const entries: string[] = [];

  if (packageJson.main && (await fs.pathExists(path.join(projectPath, packageJson.main)))) {
    entries.push(packageJson.main);
  }

  for (const entry of commonEntries) {
    if (!entries.includes(entry) && (await fs.pathExists(path.join(projectPath, entry)))) {
      entries.push(entry);
    }
  }

  return entries;
}

async function scanStructure(projectPath: string): Promise<string[]> {
  const ignoreDirs = ['node_modules', '.git', 'dist', 'build', 'coverage', '.next'];

  try {
    const topLevelDirs = await fs.readdir(projectPath);
    const structure: string[] = [];

    for (const item of topLevelDirs) {
      if (ignoreDirs.includes(item) || item.startsWith('.')) continue;

      const itemPath = path.join(projectPath, item);
      const stats = await fs.stat(itemPath);

      if (stats.isDirectory()) {
        structure.push(item);
      }
    }

    return structure;
  } catch {
    return [];
  }
}

export async function analyzeProject(projectPath: string = process.cwd()): Promise<ProjectData> {
  try {
    const projectType = await detectProjectType(projectPath);
    const packageJsonPath = path.join(projectPath, 'package.json');
    let packageJson: {
      name?: string;
      description?: string;
      version?: string;
      main?: string;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      scripts?: Record<string, string>;
    } = {};

    let pythonDeps: Record<string, string> = {};

    if (await fs.pathExists(packageJsonPath)) {
      packageJson = await fs.readJson(packageJsonPath);
    } else if (projectType === 'python') {
      pythonDeps = await parseRequirementsTxt(projectPath);
    }

    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...pythonDeps,
    };

    const language =
      projectType === 'node'
        ? detectLanguage(projectPath, allDeps)
        : detectLanguageFromProjectType(projectType);

    const techStack: TechStack = {
      backend: detectBackend(allDeps, projectType),
      frontend: detectFrontend(allDeps),
      database: detectDatabase(allDeps, projectType),
      authentication: detectAuth(allDeps, projectType),
      language,
    };

    const structure = await scanStructure(projectPath);
    const entryPoints = await detectEntryPoints(projectPath, packageJson);

    const projectName =
      projectType === 'node'
        ? packageJson.name || path.basename(projectPath)
        : path.basename(projectPath);

    return {
      name: projectName || 'Unnamed Project',
      description: packageJson.description || `A ${language} project`,
      version: packageJson.version || '1.0.0',
      techStack,
      dependencies: Object.keys(packageJson.dependencies || {}),
      devDependencies: Object.keys(packageJson.devDependencies || {}),
      structure,
      scripts: Object.keys(packageJson.scripts || {}),
      entryPoints,
    };
  } catch (error) {
    throw new Error(`Failed to analyze project: ${getErrorMessage(error)}`);
  }
}
