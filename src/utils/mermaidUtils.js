import { exec } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import util from 'util';
import chalk from 'chalk';
import ora from 'ora';

const execPromise = util.promisify(exec);

/**
 * Renders a Mermaid diagram to PNG using @mermaid-js/mermaid-cli
 * @param {string} mermaidCode - The mermaid diagram definition
 * @param {string} outputPath - The destination path for the PNG
 */
export async function renderMermaidToPng(mermaidCode, outputPath) {
    const spinner = ora('Generating diagram image...').start();

    try {
        // Ensure output directory exists
        await fs.ensureDir(path.dirname(outputPath));

        // Create a temporary file for the mermaid code
        const tempMmdPath = path.resolve(path.dirname(outputPath), `temp_${Date.now()}.mmd`);
        await fs.writeFile(tempMmdPath, mermaidCode);

        // Use npx to run mmdc (Mermaid CLI)
        // We use npx to avoid issues if it's not in the PATH, but installed in node_modules
        // -i input -o output -b transparent (optional)
        // On Windows, npx might have issues finding local bin, so we can try to find it
        const mmdcPath = path.join(process.cwd(), 'node_modules', '.bin', 'mmdc.cmd');
        const executable = (process.platform === 'win32' && await fs.pathExists(mmdcPath))
            ? `"${mmdcPath}"`
            : 'npx mmdc';

        const command = `${executable} -i "${tempMmdPath}" -o "${outputPath}" -b transparent`;

        console.log(chalk.gray(`Executing: ${command}`));

        await execPromise(command);

        // Cleanup temp file
        await fs.remove(tempMmdPath);

        spinner.succeed(chalk.green(`Diagram image saved to ${outputPath}`));
        return outputPath;
    } catch (error) {
        spinner.fail(chalk.red('Failed to generate diagram image'));
        console.error(chalk.yellow('\nTip: Ensure @mermaid-js/mermaid-cli is installed correctly.'));
        console.error(chalk.dim(error.message));
        // Don't throw, just return null so we can still save the markdown
        return null;
    }
}
