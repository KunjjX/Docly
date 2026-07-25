import chalk from 'chalk';

const LOG_LEVELS: Record<string, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

function getLevel(): number {
  const envLevel = process.env.LOG_LEVEL?.toLowerCase() || 'info';
  return LOG_LEVELS[envLevel] ?? LOG_LEVELS.info;
}

class Logger {
  success(message: string): void {
    console.log(chalk.green(`[OK] ${message}`));
  }

  error(message: string): void {
    console.error(chalk.red(`[ERR] ${message}`));
  }

  info(message: string): void {
    if (getLevel() >= LOG_LEVELS.info) {
      console.log(chalk.blue(`[INFO] ${message}`));
    }
  }

  warn(message: string): void {
    if (getLevel() >= LOG_LEVELS.warn) {
      console.warn(chalk.yellow(`[WARN] ${message}`));
    }
  }

  debug(message: string): void {
    if (getLevel() >= LOG_LEVELS.debug) {
      console.log(chalk.gray(`[DEBUG] ${message}`));
    }
  }

  section(title: string): void {
    if (getLevel() >= LOG_LEVELS.info) {
      console.log(`\n${chalk.cyan.bold('═'.repeat(50))}`);
      console.log(chalk.cyan.bold(`  ${title}`));
      console.log(`${chalk.cyan.bold('═'.repeat(50))}\n`);
    }
  }
}

export default new Logger();
