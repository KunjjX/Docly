#!/usr/bin/env node

/**
 * Installation verification script for Docly CLI
 * Run this after installing to verify everything is set up correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Verifying Docly Installation...\n');

let hasErrors = false;

// Check Node version
const nodeVersion = process.version;
const requiredVersion = 16;
const currentVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (currentVersion >= requiredVersion) {
    console.log(`✅ Node.js version: ${nodeVersion}`);
} else {
    console.log(`❌ Node.js version: ${nodeVersion} (Required: >= v${requiredVersion}.0.0)`);
    hasErrors = true;
}

// Check required files
const requiredFiles = [
    'bin/index.js',
    'src/commands/index.js',
    'src/core/analyzer.js',
    'src/core/generator.js',
    'src/api/client.js',
    'src/templates/index.js',
    'src/utils/fileUtils.js',
    'package.json'
];

console.log('\n📁 Checking required files:');
requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        hasErrors = true;
    }
});

// Check package.json
console.log('\n📦 Checking package.json:');
try {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    console.log(`✅ Package name: ${packageJson.name}`);
    console.log(`✅ Version: ${packageJson.version}`);
    console.log(`✅ Binary command: ${Object.keys(packageJson.bin)[0]}`);
} catch (error) {
    console.log(`❌ Error reading package.json: ${error.message}`);
    hasErrors = true;
}

// Check dependencies
console.log('\n📚 Checking dependencies:');
const requiredDeps = ['commander', 'chalk', 'ora', 'axios', 'dotenv', 'fs-extra'];
try {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    requiredDeps.forEach(dep => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            console.log(`✅ ${dep}`);
        } else {
            console.log(`❌ ${dep} - NOT INSTALLED`);
            hasErrors = true;
        }
    });
} catch (error) {
    console.log(`❌ Error checking dependencies`);
    hasErrors = true;
}

// Check environment setup
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

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
    console.log('❌ Installation has errors. Please fix the issues above.');
    process.exit(1);
} else {
    console.log('✅ Installation verified successfully!');
    console.log('\n🚀 You can now use Docly:');
    console.log('   docly --help');
    console.log('   docly readme');
    console.log('   docly architecture');
    process.exit(0);
}
