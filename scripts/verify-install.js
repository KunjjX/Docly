#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Docly Installation...\n');

let hasErrors = false;

const nodeVersion = process.version;
const requiredVersion = 18;
const currentVersion = Number.parseInt(nodeVersion.slice(1).split('.')[0]);

if (currentVersion >= requiredVersion) {
  console.log(`✅ Node.js version: ${nodeVersion}`);
} else {
  console.log(`❌ Node.js version: ${nodeVersion} (Required: >= v${requiredVersion}.0.0)`);
  hasErrors = true;
}

const requiredFiles = [
  'dist/bin.js',
  'dist/index.js',
  'dist/client.js',
  'dist/analyzer.js',
  'dist/generator.js',
  'dist/config.js',
  'dist/templates.js',
  'dist/fileUtils.js',
  'package.json',
];

console.log('\n📁 Checking required files:');
for (const file of requiredFiles) {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    hasErrors = true;
  }
}

console.log('\n📦 Checking package.json:');
try {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  console.log(`✅ Package name: ${packageJson.name}`);
  console.log(`✅ Version: ${packageJson.version}`);
  console.log(`✅ Binary command: ${Object.keys(packageJson.bin)[0]}`);
} catch (error) {
  console.log(`❌ Error reading package.json: ${(error as Error).message}`);
  hasErrors = true;
}

console.log('\n📚 Checking dependencies:');
const requiredDeps = ['commander', 'chalk', 'ora', 'axios', 'dotenv', 'fs-extra'];
try {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  for (const dep of requiredDeps) {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}`);
    } else {
      console.log(`❌ ${dep} - NOT INSTALLED`);
      hasErrors = true;
    }
  }
} catch {
  console.log('❌ Error checking dependencies');
  hasErrors = true;
}

console.log('\n🔐 Checking environment:');
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('GEMINI_API_KEY') || envContent.includes('OPENAI_API_KEY')) {
    console.log('✅ API key configuration found');
  } else {
    console.log('⚠️  No API key found in .env (required for AI generation)');
  }
} else {
  console.log('⚠️  .env file not found (create from .env.example)');
}

console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Installation has errors.');
  process.exit(1);
} else {
  console.log('✅ Installation verified successfully!');
  console.log('\n🚀 You can now use Docly:');
  console.log('   docly --help');
  console.log('   docly readme');
  console.log('   docly init');
  process.exit(0);
}
