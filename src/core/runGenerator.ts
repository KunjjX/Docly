import chalk from 'chalk';
import ora from 'ora';
import type { CLIOptions } from '../types';
import { writeDoc } from '../utils/fileUtils.js';
import { renderMermaidToPng } from '../utils/mermaidUtils.js';
import { getErrorMessage } from '../utils/validator.js';
import { analyzeProject } from './analyzer.js';
import { generateDoc } from './generator.js';

export async function runGenerator(type: string, options: CLIOptions = {}): Promise<void> {
  if (options.dryRun) {
    console.log(chalk.cyan(`\n  [DRY RUN] Would generate: ${chalk.bold(type)}`));
    console.log(chalk.dim(`  Output directory: ${options.output || './docs'}`));
    console.log(chalk.dim(`  Format: ${options.format || 'md'}`));
    if (options.overwrite) console.log(chalk.dim('  Overwrite: enabled'));
    if (options.ai) console.log(chalk.dim(`  AI provider: ${options.ai}`));
    console.log('');
    return;
  }

  const spinner = ora('Analyzing project...').start();

  try {
    const projectData = await analyzeProject();
    spinner.succeed(chalk.green('Project analyzed successfully'));

    const content = await generateDoc(type, projectData, options);
    spinner.succeed(chalk.green(`${type} generated successfully`));

    if (
      type === 'diagram' &&
      (options.format === 'png' || options.format === 'svg' || options.format === 'pdf')
    ) {
      const ext = options.format || 'png';
      const outputFile = options.output?.endsWith(`.${ext}`)
        ? options.output
        : `${options.output || './docs/diagrams'}/${options.diagramType || 'diagram'}.${ext}`;
      spinner.start(`Generating ${ext.toUpperCase()} image...`);
      const imagePath = await renderMermaidToPng(content, outputFile, ext as 'png' | 'svg' | 'pdf');

      if (imagePath) {
        spinner.succeed(chalk.green(`Successfully generated ${imagePath}`));
      }
      return;
    }

    spinner.start('Writing to file...');

    const writeType =
      type === 'diagram' && options.diagramType ? `diagram:${options.diagramType}` : type;

    const outputPath = await writeDoc(writeType, content, options.output, options.overwrite);

    spinner.succeed(chalk.green(`Successfully generated ${outputPath}`));
  } catch (error) {
    const msg = getErrorMessage(error);
    spinner.fail(chalk.red(`Failed: ${msg}`));
    if (msg.includes('package.json')) {
      console.log(chalk.yellow("\n  Hint: Make sure you're in a Node.js project directory"));
      console.log(chalk.yellow('  Run "npm init" to create a new project\n'));
    } else if (msg.includes('API key')) {
      console.log(chalk.yellow('\n  Hint: Set your API key in .env file:'));
      console.log(chalk.cyan('  GEMINI_API_KEY=your_key_here\n'));
    }

    throw error;
  }
}
