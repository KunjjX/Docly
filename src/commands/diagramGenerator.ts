import path from 'node:path';
import chalk from 'chalk';
import fs from 'fs-extra';
import ora from 'ora';
import { analyzeProject } from '../core/analyzer.js';
import { generateDoc } from '../core/generator.js';
import type { CLIOptions, DiagramType } from '../types';
import config from '../utils/config.js';
import { getErrorMessage } from '../utils/validator.js';
import { diagramRender } from './diagramRender.js';

export const DIAGRAM_TYPES: DiagramType[] = [
  'architecture',
  'workflow',
  'usecase',
  'activity',
  'dfd-level-1',
  'dfd-level-2',
  'dfd-level-3',
  'flowchart',
  'sequence',
  'class',
  'state',
  'er',
  'component',
  'deployment',
];

export function validateDiagram(type: string, code: string): void {
  const cleanCode = code.replace(/%%.*$/gm, '').trim();

  switch (type) {
    case 'activity':
      if (!cleanCode.startsWith('stateDiagram-v2'))
        throw new Error('Must start with stateDiagram-v2');
      if (code.includes('graph TD') || code.includes('flowchart TD'))
        throw new Error('Activity diagram cannot use graph/flowchart syntax');
      if (/-->\s*"/.test(code)) throw new Error('Quoted transition target detected');
      if (/"\s*-->/.test(code)) throw new Error('Quoted transition source detected');
      break;

    case 'workflow':
    case 'flowchart':
      if (!cleanCode.startsWith('flowchart')) throw new Error('Must start with flowchart');
      if (/\w+\(/.test(code)) throw new Error('Parentheses in node definition detected');
      break;

    case 'sequence':
      if (!cleanCode.startsWith('sequenceDiagram'))
        throw new Error('Must start with sequenceDiagram');
      break;

    case 'class':
      if (!cleanCode.startsWith('classDiagram')) throw new Error('Must start with classDiagram');
      break;

    case 'state':
      if (!cleanCode.startsWith('stateDiagram-v2'))
        throw new Error('Must start with stateDiagram-v2');
      break;

    case 'erd':
    case 'er':
      if (!cleanCode.startsWith('erDiagram')) throw new Error('Must start with erDiagram');
      break;

    case 'usecase':
      if (!cleanCode.startsWith('graph') && !cleanCode.startsWith('flowchart'))
        throw new Error('Must start with graph or flowchart (Simulated Use Case)');
      break;

    case 'architecture':
    case 'component':
    case 'deployment':
    case 'dfd':
    case 'dfd-level-1':
    case 'dfd-level-2':
    case 'dfd-level-3':
      if (
        !cleanCode.startsWith('graph') &&
        !cleanCode.startsWith('flowchart') &&
        !cleanCode.startsWith('C4Context')
      ) {
        throw new Error('Must start with graph or flowchart');
      }
      break;
  }
}

export async function handleDiagramCommand(
  file: string | undefined,
  options: CLIOptions,
  type: string
): Promise<void> {
  if (file) {
    return diagramRender(file, options, type);
  }

  console.log(chalk.blue(`\nAnalyzing project structure for ${type} diagram...`));

  try {
    const projectData = await analyzeProject(process.cwd());
    const maxRetries = config.get('maxRetries');
    let mermaidCode = '';
    let isValid = false;
    let validationError = '';

    const spinner = ora(`Design AI is creating ${type} diagram...`).start();

    for (let i = 0; i < maxRetries; i++) {
      mermaidCode = await generateDoc('diagram', projectData, {
        diagramType: type,
        ai: options.ai,
        previousError: i > 0 ? validationError : undefined,
      });

      mermaidCode = mermaidCode
        .replace(/^```mermaid\s*/gm, '')
        .replace(/^```\s*/gm, '')
        .replace(/```$/gm, '')
        .trim();

      try {
        validateDiagram(type, mermaidCode);
      } catch (err) {
        validationError = `Static Validation: ${getErrorMessage(err)}`;
        if (i < maxRetries - 1) {
          spinner.text = `Validation failed (${getErrorMessage(err)}). Regenerating...`;
          continue;
        }
        break;
      }

      const tempDir = path.resolve(process.cwd(), 'docs', 'temp_diagrams');
      await fs.ensureDir(tempDir);
      const key = Math.random().toString(36).substring(7);
      const tempMmdPath = path.join(tempDir, `${type}_${key}_candidate.mmd`);

      try {
        await fs.writeFile(tempMmdPath, mermaidCode);
        await diagramRender(tempMmdPath, { output: tempDir }, type);

        isValid = true;

        const tempPngPath = path.join(tempDir, `${type}_${key}_candidate.png`);
        await fs.remove(tempPngPath).catch(() => {});
        await fs.remove(tempMmdPath).catch(() => {});
        await fs.remove(tempDir).catch(() => {});

        break;
      } catch (err) {
        validationError = `Render Validation: ${getErrorMessage(err)}`;
        await fs.remove(tempMmdPath).catch(() => {});

        if (i < maxRetries - 1) {
          spinner.text = `Render failed (${getErrorMessage(err)}). Regenerating...`;
        }
      }
    }

    if (!isValid) {
      spinner.fail(chalk.red('Failed to generate valid diagram after retries.'));
      console.error(chalk.red(`Last Validation Error: ${validationError}`));
      console.error(chalk.dim(`\nGenerated Code (Invalid):\n${mermaidCode}`));
      throw new Error(`Failed to generate valid ${type} diagram after ${maxRetries} retries`);
    }

    spinner.succeed(chalk.green('Diagram definition generated and validated'));

    const outputDir = options.output
      ? path.resolve(options.output)
      : path.resolve(process.cwd(), 'docs', 'diagrams');
    await fs.ensureDir(outputDir);

    const filename = `${type}.mmd`;
    const filePath = path.join(outputDir, filename);

    await fs.writeFile(filePath, mermaidCode);
    console.log(chalk.dim(`\nSaved Mermaid definition: ${filePath}`));

    await diagramRender(filePath, options, type);

    const pngPath = path.join(outputDir, `${type}.png`);
    console.log(chalk.cyan(`\nGenerated files:`));
    console.log(chalk.dim(filePath));
    console.log(chalk.green(pngPath));
  } catch (error) {
    console.error(chalk.red(`\nFailed to generate ${type} diagram:`));
    console.error(chalk.red(getErrorMessage(error)));
    throw error;
  }
}
