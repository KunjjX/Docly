// env-loader.js - Load environment variables before anything else
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load from current working directory
const envPath = path.join(process.cwd(), '.env');
const result = dotenv.config({ path: envPath });

// Debug: Log if .env was loaded successfully
if (result.error) {
  console.log('⚠️  No .env file found in:', process.cwd());
  console.log('   You can set environment variables directly:');
  console.log('   $env:GEMINI_API_KEY="your_key_here"  (PowerShell)');
  console.log('   export GEMINI_API_KEY="your_key_here"  (Mac/Linux)');
} else {
  console.log('✅ .env file loaded from:', process.cwd());

  // Debug: Check if GEMINI_API_KEY is actually set
  if (process.env.GEMINI_API_KEY) {
    console.log('✅ GEMINI_API_KEY is set');
  } else {
    console.log('❌ GEMINI_API_KEY not found in .env file');
    console.log('   .env file contents:');
    try {
      const envContents = fs.readFileSync(envPath, 'utf-8');
      envContents.split('\n').forEach((line, index) => {
        if (line.trim() && !line.startsWith('#')) {
          console.log(`   Line ${index + 1}: ${line.substring(0, 30)}...`);
        }
      });
    } catch (err) {
      console.log('   Could not read .env file');
    }
  }
}

// Export current environment
export const env = process.env;
