import ora from 'ora';
import chalk from 'chalk';
import { analyzeProject } from './analyzer.js';
import { generateDoc } from './generator.js';
import { writeDoc } from '../utils/fileUtils.js';

/**
 * Runs the documentation generator for a specific type
 * @param {string} type - Document type (readme, srs, architecture, etc.)
 * @param {Object} options - Command options
 */
export async function runGenerator(type, options = {}) {
  const spinner = ora('Analyzing project...').start();

  try {
    // Step 1: Analyze project
    const projectData = await analyzeProject();
    spinner.succeed(chalk.green('Project analyzed successfully'));

    // AI-powered generation
    const content = await generateDoc(type, projectData, options.ai);

    spinner.succeed(chalk.green(`${type} generated successfully`));

    // Step 3: Write to file
    spinner.start('Writing to file...');
    const outputPath = await writeDoc(type, content, options.output);

    spinner.succeed(chalk.green(`✅ Successfully generated ${outputPath}`));
  } catch (error) {
    spinner.fail(chalk.red(`❌ Failed: ${error.message}`));

    // Show helpful error messages
    if (error.message.includes('package.json')) {
      console.log(chalk.yellow("\n  Hint: Make sure you're in a Node.js project directory"));
      console.log(chalk.yellow('  Run "npm init" to create a new project\n'));
    } else if (error.message.includes('API key')) {
      console.log(chalk.yellow('\n  Hint: Set your API key in .env file:'));
      console.log(chalk.cyan('  GEMINI_API_KEY=your_key_here\n'));
    }

    process.exit(1);
  }
}
