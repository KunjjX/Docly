import path from 'node:path';
import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import { renderMermaidToPng } from '../utils/mermaidUtils.js';

export async function diagramRender(
  inputPath: string,
  options: { output?: string; format?: string },
  diagramType: string
): Promise<void> {
  const format = (options.format || 'png') as 'png' | 'svg' | 'pdf';
  const spinner = ora(`Generating ${diagramType} diagram...`).start();

  try {
    const resolvedInput = path.resolve(inputPath);
    const normalizedInput = path.normalize(resolvedInput);
    if (!(await fs.pathExists(normalizedInput))) {
      throw new Error(`Input file not found: ${inputPath}`);
    }

    const outputDir = options.output
      ? path.resolve(options.output)
      : path.resolve(process.cwd(), 'docs', 'diagrams');
    await fs.ensureDir(outputDir);

    const inputFilename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(outputDir, `${inputFilename}.${format}`);

    const mermaidCode = await fs.readFile(normalizedInput, 'utf-8');
    const result = await renderMermaidToPng(mermaidCode, outputPath, format);

    if (!result) {
      throw new Error(`Failed to render diagram to ${format.toUpperCase()}`);
    }

    spinner.succeed(chalk.green(`Successfully generated ${diagramType} diagram: ${outputPath}`));

    const keepMmd = process.env.KEEP_MMD === 'true';
    if (!keepMmd) {
      await fs.remove(normalizedInput);
    }
  } catch (error) {
    spinner.fail(chalk.red(`Failed to generate ${diagramType} diagram`));
    throw error;
  }
}
