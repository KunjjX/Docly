#!/usr/bin/env node

// Load environment variables FIRST - using correct relative path
import '../src/utils/env-loader.js';

import { Command } from 'commander';
import chalk from 'chalk';
import { readme, srs, architecture, workflow, testcases } from '../src/commands/index.js';

const program = new Command();

program
  .name('docly')
  .description('Automatically generate complete project documentation with AI')
  .version('1.0.0');

// README command
program
  .command('readme')
  .description('Generate comprehensive README.md')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(readme);

// SRS command
program
  .command('srs')
  .description('Generate Software Requirements Specification')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(srs);

// Architecture command
program
  .command('architecture')
  .description('Generate system architecture diagram')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .action(architecture);

// Workflow command
program
  .command('workflow')
  .description('Generate end-to-end workflow documentation')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(workflow);

// Test cases command
program
  .command('testcases')
  .description('Generate test case documentation')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(testcases);

// Error handling
program.on('command:*', () => {
  console.error(chalk.red('\n  Error: Invalid command'));
  console.log(chalk.yellow('\n  Run "docly --help" to see available commands\n'));
  process.exit(1);
});

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
