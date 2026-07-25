import path from 'node:path';
import chalk from 'chalk';
import fs from 'fs-extra';
import { sleep } from '../api/client.js';
import { runGenerator } from '../core/runGenerator.js';
import type { CLIOptions, DocType } from '../types';
import { DIAGRAM_TYPES, handleDiagramCommand } from './diagramGenerator.js';
import { diagramRender } from './diagramRender.js';

export async function readme(options: CLIOptions): Promise<void> {
  await runGenerator('readme', options);
}

export async function srs(options: CLIOptions): Promise<void> {
  await runGenerator('srs', options);
}

export async function architecture(options: CLIOptions): Promise<void> {
  await runGenerator('architecture', options);
}

export async function workflow(options: CLIOptions): Promise<void> {
  await runGenerator('workflow', options);
}

export async function testcases(options: CLIOptions): Promise<void> {
  await runGenerator('testcases', options);
}

export async function apidocs(options: CLIOptions): Promise<void> {
  await runGenerator('api-docs', options);
}

export async function setup(options: CLIOptions): Promise<void> {
  await runGenerator('setup', options);
}

export async function deploy(options: CLIOptions): Promise<void> {
  await runGenerator('deploy', options);
}

export async function security(options: CLIOptions): Promise<void> {
  await runGenerator('security', options);
}

export async function requirements(options: CLIOptions): Promise<void> {
  await runGenerator('requirements', options);
}

const DOC_TYPES: DocType[] = [
  'readme',
  'srs',
  'architecture',
  'workflow',
  'testcases',
  'api-docs',
  'setup',
  'deploy',
  'security',
  'requirements',
];

export async function generate(options: CLIOptions): Promise<void> {
  if (options.all) {
    console.log(chalk.cyan('\n🚀 Generating all documentation...\n'));

    for (const type of DOC_TYPES) {
      console.log(chalk.yellow(`\n📄 Generating ${type}...`));
      try {
        await runGenerator(type, options);
        console.log(chalk.green(`✅ ${type} generated successfully\n`));
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error(chalk.red(`❌ Failed to generate ${type}: ${msg}\n`));
      }
    }

    console.log(chalk.cyan('\n🎉 All documentation generated!\n'));
    return;
  }
  console.log(chalk.yellow('\nTip: Use --all to generate all documentation types'));
  console.log(chalk.yellow('Or run a specific command: docly readme, docly srs, etc.\n'));
}

export async function diagram(options: CLIOptions): Promise<void> {
  if (options.all) {
    console.log('Generating all diagram types...');

    for (let i = 0; i < DIAGRAM_TYPES.length; i++) {
      const type = DIAGRAM_TYPES[i];
      await runGenerator('diagram', {
        ...options,
        diagramType: type,
      });

      if (i < DIAGRAM_TYPES.length - 1) {
        console.log('Waiting 40 seconds to respect API rate limits...');
        await sleep(40000);
      }
    }
  } else {
    await runGenerator('diagram', options);
  }
}

export async function init(): Promise<void> {
  const envPath = path.join(process.cwd(), '.env');
  const configPath = path.join(process.cwd(), 'docly.config.json');

  if (await fs.pathExists(envPath)) {
    console.log(chalk.yellow('.env file already exists'));
  } else {
    await fs.writeFile(
      envPath,
      [
        '# AI Configuration',
        'GEMINI_API_KEY=your_gemini_api_key_here',
        'OPENAI_API_KEY=your_openai_api_key_here',
        '',
        '# Default AI provider (gemini or openai)',
        'AI_PROVIDER=gemini',
        '',
        '# AI Model Selection',
        'GEMINI_MODEL=gemini-2.0-flash',
        'OPENAI_MODEL=gpt-4',
        '',
        '# Output Configuration',
        'OUTPUT_DIR=./docs',
        'OVERWRITE_EXISTING=false',
        '',
        '# API Configuration',
        'API_TIMEOUT=120000',
        'MAX_RETRIES=3',
        '',
      ].join('\n')
    );
    console.log(chalk.green('✓ Created .env file'));
  }

  if (await fs.pathExists(configPath)) {
    console.log(chalk.yellow('docly.config.json already exists'));
  } else {
    await fs.writeJson(
      configPath,
      {
        outputDir: './docs',
        aiProvider: 'gemini',
        geminiModel: 'gemini-2.0-flash',
        openaiModel: 'gpt-4',
        apiTimeout: 120000,
        maxRetries: 3,
        overwriteExisting: false,
        logLevel: 'info',
      },
      { spaces: 2 }
    );
    console.log(chalk.green('✓ Created docly.config.json'));
  }

  console.log(chalk.cyan('\nSetup complete! Run "docly --help" to see available commands.'));
}

export { diagramRender, handleDiagramCommand };
