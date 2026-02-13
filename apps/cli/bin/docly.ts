#!/usr/bin/env bun

// Load environment variables FIRST - using correct relative path
import '../src/utils/env-loader';

import { Command } from 'commander';
import chalk from 'chalk';
import { readme, srs, architecture, workflow, testcases, diagram, apidocs, setup, deploy, security, requirements } from '../src/commands/index';

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

// API Documentation command
program
  .command('api-docs')
  .description('Generate API documentation')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(apidocs);

// Setup Guide command
program
  .command('setup')
  .description('Generate setup/installation guide')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(setup);

// Deployment Guide command
program
  .command('deploy')
  .description('Generate deployment guide')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(deploy);

// Security Documentation command
program
  .command('security')
  .description('Generate security documentation')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(security);

// Requirements Matrix command
program
  .command('requirements')
  .description('Generate requirements matrix')
  .option('-o, --output <dir>', 'Output directory', './docs')
  .option('--overwrite', 'Overwrite existing file', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(requirements);

// Diagram command (Legacy/Generic)
program
  .command('diagram')
  .description('Generate diagram (Architecture, Workflow, ERD, etc.)')
  .option('-t, --type <type>', 'Diagram type', 'architecture')
  .option('-f, --format <format>', 'Output format (md/png)', 'md')
  .option('-o, --output <dir>', 'Output directory', './docs/diagrams')
  .option('--all', 'Generate all diagram types', false)
  .option('--ai <provider>', 'AI provider (gemini/openai)', 'gemini')
  .action(diagram);

// Specific Diagram Commands
const diagramTypes = [
  'architecture', 'workflow', 'usecase', 'activity',
  'dfd-level-1', 'dfd-level-2', 'dfd-level-3',
  'flowchart', 'sequence', 'class', 'state',
  'er', 'component', 'deployment'
];

diagramTypes.forEach(type => {
  program
    .command(`diagram-${type} [file]`) // [file] makes it optional
    .description(`Generate and convert ${type} diagram`)
    .option('-o, --output <dir>', 'Output directory', './docs/diagrams')
    .action((file: any, options: any) => {
      // Dynamic import
      import('../src/commands/index').then(module => {
        module.handleDiagramCommand(file, options, type);
      });
    });
});

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
