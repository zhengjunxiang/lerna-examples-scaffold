import chalk from 'chalk';

const RESET = '\x1b[0m';

export const log = (content: string | string[], color?) => {
  const message = Array.isArray(content) ? content : [content];
  const colorFormat = chalk[color] ? chalk[color]('%s') : '%s';
  console.log(`${colorFormat}${RESET}`, ...message);
};

log.error = (message: string | string[]) =>
log(chalk.red(`\n🚨 ${message}`));
log.warn = (message: string | string[]) =>
log(chalk.yellow(`\n！  ${message}`));
log.info = (message: string | string[]) =>
log(chalk.green(`\n ${message}`));

export default log;
