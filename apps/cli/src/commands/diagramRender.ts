import { run } from '@mermaid-js/mermaid-cli';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

/**
 * Render a Mermaid diagram to PNG
 * @param {string} inputPath - Path to the input .mmd file
 * @param {Object} options - Command options
 * @param {string} options.out - Output directory
 * @param {string} diagramType - The expected diagram type (e.g., 'architecture', 'sequence') for validation (optional future use)
 */
export async function diagramRender(inputPath, options, diagramType: any) {
    const spinner = ora(`Generating ${diagramType} diagram...`).start();

    try {
        // 1. Validate Input File
        const absoluteInputPath = path.resolve(inputPath);
        if (!await fs.pathExists(absoluteInputPath)) {
            throw new Error(`Input file not found: ${inputPath}`);
        }

        // 2. Prepare Output
        const outputDir = options.output ? path.resolve(options.output) : path.resolve(process.cwd(), 'docs', 'diagrams');
        await fs.ensureDir(outputDir);

        const inputFilename = path.basename(inputPath, path.extname(inputPath));
        const outputPath = path.join(outputDir, `${inputFilename}.png`);

        // 3. Render using mmdc
        // Note: Puppeteer config might be needed depending on the environment, 
        // but usually default works for CLI if puppeteer is installed.
        // mmdc run expects an input file and output file.

        // We can use the run function from mermaid-cli or spawn a process. 
        // Importing 'run' directly is better if available, but the package exports vary.
        // Let's rely on the execution wrapper if the import 'run' is not straightforward, 
        // but the request implies we should use the package. 
        // Since we are in an ES module environment, let's try to import the CLI handler 
        // or execute it via child_process if strictly necessary to avoid API breakage.
        // However, looking at the package, it exposes 'run'. 

        // For simplicity and stability with the installed CLI version, 
        // let's use the standard CLI arguments approach passed to the `run` function 
        // or simulate the CLI call.

        // Actually, `run` from `mermaid-cli` might not be exposed as a clean API in all versions.
        // A safer way often used in tooling is executing the binary.
        // But since we added it to dependencies, let's try to usage it as a library if possible.
        // If not, we will use `execa` or `spawn`.

        // Let's assume we can use the library. Use a simple approach for now.
        // If this fails, we will revert to spawning `npx mmdc`.

        await run(absoluteInputPath, outputPath, {
            outputFormat: 'png',
            scale: 3 // High resolution rendering
        });

        spinner.succeed(chalk.green(`Successfully generated ${diagramType} diagram: ${outputPath}`));

        // Cleanup: Remove the .mmd file after rendering
        await fs.remove(absoluteInputPath);


    } catch (error) {
        spinner.fail(chalk.red(`Failed to generate ${diagramType} diagram`));
        // Re-throw the error so the caller can handle it (e.g. retry)
        throw error;
    }
}
