import fs from 'fs-extra';
import path from 'path';

// Note: dotenv is loaded in bin/index.js before this module is imported

/**
 * Configuration loader and validator
 */
class Config {
  constructor() {
    this.config = this.loadConfig();
  }

  /**
   * Load configuration from multiple sources
   */
  loadConfig() {
    const defaultConfig = {
      outputDir: './docs',
      aiProvider: 'gemini',
      apiTimeout: 30000,
      maxRetries: 3,
      overwriteExisting: false,
      logLevel: 'info',
      includeExamples: true,
      diagramFormat: 'mermaid',
    };

    // Try to load project config
    const projectConfig = this.loadProjectConfig();

    // Merge with environment variables
    const envConfig = {
      outputDir: process.env.OUTPUT_DIR,
      aiProvider: process.env.AI_PROVIDER,
      apiTimeout: process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT) : undefined,
      maxRetries: process.env.MAX_RETRIES ? parseInt(process.env.MAX_RETRIES) : undefined,
      overwriteExisting: process.env.OVERWRITE_EXISTING === 'true',
      logLevel: process.env.LOG_LEVEL,
    };

    // Merge configs (env > project > default)
    return {
      ...defaultConfig,
      ...projectConfig,
      ...this.removeUndefined(envConfig),
    };
  }

  /**
   * Load project-specific config from docly.config.json
   */
  loadProjectConfig() {
    try {
      const configPath = path.join(process.cwd(), 'docly.config.json');
      if (fs.existsSync(configPath)) {
        return fs.readJsonSync(configPath);
      }
    } catch (error) {
      // Config file is optional
    }
    return {};
  }

  /**
   * Remove undefined values from object
   */
  removeUndefined(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
  }

  /**
   * Get config value
   */
  get(key) {
    return this.config[key];
  }

  /**
   * Get all config
   */
  getAll() {
    return { ...this.config };
  }

  /**
   * Validate required configuration
   */
  validate() {
    const errors = [];

    // Check API keys
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
