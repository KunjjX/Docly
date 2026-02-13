import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

console.log(chalk.cyan('🔍 Verifying Docly Monorepo Health...\n'));

let hasErrors = false;

// 1. Check Runtime Versions
const nodeVersion = process.version;
const bunVersion = process.versions.bun;

console.log(chalk.bold('🚀 Runtimes:'));
if (parseInt(nodeVersion.slice(1)) >= 16) {
  console.log(chalk.green('✅ Node.js: ' + nodeVersion));
} else {
  console.log(chalk.red('❌ Node.js: ' + nodeVersion + ' (Min: v16)'));
  hasErrors = true;
}

if (bunVersion) {
  console.log(chalk.green('✅ Bun: ' + bunVersion));
} else {
  console.log(chalk.yellow('⚠️  Bun: Not detected (Recommended for development)'));
}

// 2. Check Monorepo Structure
const rootDir = path.resolve(import.meta.dir, '../../..');
const requiredPaths = [
  'apps/cli',
  'apps/docs',
  'packages/core',
  'apps/cli/bin/docly.ts',
  'apps/cli/src/core/analyzer.ts',
  'package.json',
  'tsconfig.json'
];

console.log(chalk.bold('\n📁 Monorepo Structure:'));
for (const relPath of requiredPaths) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    console.log(chalk.green('✅ ' + relPath));
  } else {
    console.log(chalk.red('❌ ' + relPath + ' - MISSING'));
    hasErrors = true;
  }
}

// 3. Check Workspace package.json
console.log(chalk.bold('\n📦 Workspace Manifests:'));
const manifestPaths = [
  'package.json',
  'apps/cli/package.json',
  'apps/docs/package.json',
  'packages/core/package.json'
];

for (const manifestPath of manifestPaths) {
  try {
    const pkg = fs.readJsonSync(path.join(rootDir, manifestPath));
    console.log(chalk.green(`✅ ${manifestPath} (${pkg.name}@${pkg.version || '1.0.0'})`));
  } catch (err) {
    console.log(chalk.red(`❌ ${manifestPath} - Error reading`));
    hasErrors = true;
  }
}

// 4. Check Environment Setup
console.log(chalk.bold('\n🔐 Security & Environment:'));
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  console.log(chalk.green('✅ .env file detected'));
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('GEMINI_API_KEY')) {
    console.log(chalk.green('✅ GEMINI_API_KEY found'));
  } else {
    console.log(chalk.yellow('⚠️  GEMINI_API_KEY missing in .env'));
  }
} else {
  console.log(chalk.yellow('⚠️  .env file not found (create from .env.example)'));
}

// Final Report
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log(chalk.red('\n❌ Health check failed. Please fix the items above.'));
  process.exit(1);
} else {
  console.log(chalk.green('\n✨ Monorepo is healthy and ready for development!'));
  console.log(chalk.gray('\nUseful Commands:'));
  console.log('  bun run cli --help   # Run CLI');
  console.log('  bun test             # Run all tests');
  console.log('  bun docs dev         # Start docs site');
  process.exit(0);
}
