import chalk from 'chalk';

/**
 * Logger utility for consistent console output
 */
class Logger {
  /**
   * Log success message
   */
  success(message) {
    console.log(chalk.green('✅ ' + message));
  }

  /**
   * Log error message
   */
  error(message) {
    console.log(chalk.red('❌ ' + message));
  }

  /**
   * Log info message
   */
  info(message) {
    console.log(chalk.blue('ℹ ' + message));
  }

  /**
   * Log warning message
   */
  warn(message) {
    console.log(chalk.yellow('⚠ ' + message));
  }

  /**
   * Log debug message (only if DEBUG env var is set)
   */
  debug(message) {
    if (process.env.DEBUG === 'true') {
      console.log(chalk.gray('🔍 ' + message));
    }
  }

  /**
   * Log a section header
   */
  section(title) {
    console.log('\n' + chalk.cyan.bold('═'.repeat(50)));
    console.log(chalk.cyan.bold('  ' + title));
    console.log(chalk.cyan.bold('═'.repeat(50)) + '\n');
  }
}

export default new Logger();
