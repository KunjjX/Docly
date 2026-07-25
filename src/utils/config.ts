import path from 'node:path';
import chalk from 'chalk';
import fs from 'fs-extra';
import type { ConfigData } from '../types';

const configPaths = [
  path.join(process.cwd(), 'docly.config.json'),
  path.join(process.cwd(), '.doclyrc.json'),
];

class Config {
  private config: ConfigData;

  constructor() {
    this.config = this.loadConfig();
    const { valid, errors } = this.validate();
    if (!valid) {
      for (const err of errors) {
        console.warn(chalk.yellow(`Config warning: ${err}`));
      }
    }
  }

  private loadConfig(): ConfigData {
    const defaultConfig: ConfigData = {
      outputDir: './docs',
      aiProvider: 'gemini',
      geminiModel: 'gemini-2.0-flash',
      openaiModel: 'gpt-4',
      apiTimeout: 30000,
      maxRetries: 3,
      overwriteExisting: false,
      logLevel: 'info',
    };

    const projectConfig = this.loadProjectConfig();
    const envProvider = process.env.AI_PROVIDER;
    const envConfig: Partial<ConfigData> = {
      outputDir: process.env.OUTPUT_DIR,
      aiProvider: envProvider === 'gemini' || envProvider === 'openai' ? envProvider : undefined,
      geminiModel: process.env.GEMINI_MODEL,
      openaiModel: process.env.OPENAI_MODEL,
      apiTimeout: process.env.API_TIMEOUT
        ? Number.parseInt(process.env.API_TIMEOUT, 10)
        : undefined,
      maxRetries: process.env.MAX_RETRIES
        ? Number.parseInt(process.env.MAX_RETRIES, 10)
        : undefined,
      overwriteExisting: process.env.OVERWRITE_EXISTING === 'true',
      logLevel: process.env.LOG_LEVEL,
    };

    return {
      ...defaultConfig,
      ...projectConfig,
      ...this.removeUndefined(envConfig),
    };
  }

  private loadProjectConfig(): Partial<ConfigData> {
    for (const configPath of configPaths) {
      try {
        if (fs.existsSync(configPath)) {
          const raw = fs.readJsonSync(configPath) as Partial<ConfigData>;
          return raw;
        }
      } catch {}
    }
    return {};
  }

  private removeUndefined(obj: Partial<ConfigData>): Partial<ConfigData> {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined)
    ) as Partial<ConfigData>;
  }

  get<T extends keyof ConfigData>(key: T): ConfigData[T] {
    return this.config[key];
  }

  getAll(): ConfigData {
    return { ...this.config };
  }

  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const provider = this.get('aiProvider');

    if (provider === 'gemini' && !process.env.GEMINI_API_KEY) {
      errors.push('GEMINI_API_KEY is required when using Gemini provider');
    }
    if (provider === 'openai' && !process.env.OPENAI_API_KEY) {
      errors.push('OPENAI_API_KEY is required when using OpenAI provider');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export default new Config();
