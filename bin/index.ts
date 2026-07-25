#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { Command } from 'commander';
import '../src/utils/env-loader.js';
import '../src/utils/config.js';
import { DIAGRAM_TYPES } from '../src/commands/diagramGenerator.js';
import {
  apidocs,
  architecture,
  deploy,
  diagram,
  generate,
  handleDiagramCommand,
  init,
  readme,
  requirements,
  security,
  setup,
  srs,
  testcases,
  workflow,
} from '../src/commands/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf-8'));

const program = new Command();

program
  .name('docly')
  .description('Automatically generate complete project documentation with AI')
  .version(pkg.version);

program
  .command('readme')
  .description('Generate comprehensive README.md')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(readme);

program
  .command('srs')
  .description('Generate Software Requirements Specification')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(srs);

program
  .command('architecture')
  .description('Generate system architecture documentation')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(architecture);

program
  .command('workflow')
  .description('Generate end-to-end workflow documentation')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(workflow);

program
  .command('testcases')
  .description('Generate test case documentation')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(testcases);

program
  .command('api-docs')
  .description('Generate API documentation')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(apidocs);

program
  .command('setup')
  .description('Generate setup/installation guide')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(setup);

program
  .command('deploy')
  .description('Generate deployment guide')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(deploy);

program
  .command('security')
  .description('Generate security documentation')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(security);

program
  .command('requirements')
  .description('Generate requirements matrix')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(requirements);

program
  .command('init')
  .description('Scaffold .env and docly.config.json for your project')
  .action(init);

program
  .command('generate')
  .description('Generate documentation (use --all for everything)')
  .option('--all', 'Generate all documentation types', false)
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing files', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .option('--dry-run', 'Simulate generation without writing files', false)
  .action(generate);

program
  .command('diagram')
  .description('Generate diagram (Architecture, Workflow, ERD, etc.)')
  .option('-t, --diagram-type <type>', 'Diagram type', 'architecture')
  .option('-f, --format <format>', 'Output format (md/png/svg/pdf)', 'md')
  .option('-o, --output <dir>', 'Output directory', './docs/diagrams')
  .option('--all', 'Generate all diagram types', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .option('--dry-run', 'Simulate generation without writing files', false)
  .action(diagram);

for (const type of DIAGRAM_TYPES) {
  program
    .command(`diagram-${type} [file]`)
    .description(`Generate and convert ${type} diagram`)
    .option('-o, --output <dir>', 'Output directory', './docs/diagrams')
    .action((file: string | undefined, options: { output?: string }) => {
      handleDiagramCommand(file, options, type);
    });
}

program.on('command:*', () => {
  console.error(chalk.red('\n  Error: Invalid command'));
  console.log(chalk.yellow('\n  Run "docly --help" to see available commands\n'));
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error(chalk.red('\n  Error:'), chalk.dim(getErrorMessage(reason)), '\n');
  process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
  console.error(chalk.red('\n  Unexpected error:'), chalk.dim(error.message), '\n');
  process.exit(1);
});

async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    console.error(chalk.red('\n  Error:'), chalk.dim(getErrorMessage(error)), '\n');
    process.exit(1);
  }
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  main();
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
