import { execFile } from 'node:child_process';
import path from 'node:path';
import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import { getErrorMessage } from './validator.js';

export async function renderMermaidToPng(
  mermaidCode: string,
  outputPath: string,
  format: 'png' | 'svg' | 'pdf' = 'png'
): Promise<string | null> {
  const label = format.toUpperCase();
  const spinner = ora(`Generating ${label} diagram...`).start();

  try {
    await fs.ensureDir(path.dirname(outputPath));

    const tempMmdPath = path.resolve(path.dirname(outputPath), `temp_${Date.now()}.mmd`);
    await fs.writeFile(tempMmdPath, mermaidCode);

    const args = ['mmdc', '-i', tempMmdPath, '-o', outputPath, '-b', 'transparent', '-f', format];

    await new Promise<void>((resolve, reject) => {
      const child = execFile('npx', args, { timeout: 60000 }, error => {
        if (error) reject(error);
        else resolve();
      });
      child.on('error', reject);
    });

    await fs.remove(tempMmdPath);

    spinner.succeed(chalk.green(`Diagram ${label} saved to ${outputPath}`));
    return outputPath;
  } catch (error) {
    spinner.fail(chalk.red(`Failed to generate ${label} diagram`));
    console.error(chalk.yellow('\nTip: Ensure @mermaid-js/mermaid-cli is installed correctly.'));
    console.error(chalk.dim(getErrorMessage(error)));
    return null;
  }
}
