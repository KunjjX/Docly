#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const PUPPETEER_CACHE = join(homedir(), '.cache', 'puppeteer');

try {
    if (!existsSync(PUPPETEER_CACHE)) {
        console.log('📦 Installing Chrome for diagram rendering...');
        execSync('npx puppeteer browsers install chrome', {
            stdio: 'inherit',
            timeout: 120000,
        });
        console.log('✅ Chrome installed successfully');
    } else {
        console.log('✅ Chrome already installed');
    }
} catch (error) {
    console.warn('⚠️  Could not install Chrome automatically.');
    console.warn('   Diagram PNG rendering will not be available.');
    console.warn('   To fix, run: npx puppeteer browsers install chrome');
}
