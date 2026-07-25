import path from 'node:path';
import dotenv from 'dotenv';

let loaded = false;

export function loadEnv(envPath?: string): void {
  if (loaded) return;
  loaded = true;

  const resolvedPath = envPath || path.join(process.cwd(), '.env');
  const result = dotenv.config({ path: resolvedPath });

  if (result.error) {
    console.log('No .env file found in:', process.cwd());
    console.log('   Set environment variables directly:');
    console.log('   export GEMINI_API_KEY="your_key_here"  (Mac/Linux)');
    console.log('   $env:GEMINI_API_KEY="your_key_here"  (PowerShell)');
  } else if (!process.env.GEMINI_API_KEY) {
    console.log('GEMINI_API_KEY not found in .env file');
  }
}

export const env = process.env;

loadEnv();
