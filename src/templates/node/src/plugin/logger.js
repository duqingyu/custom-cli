import chalk from 'chalk'

class Logger {
  constructor() {}
  static info(...msg) {
    console.log(chalk.green(...msg))
  }
  static warn(...msg) {
    const warning = chalk.keyword('orange')
    console.warn(warning(...msg))
  }
  static error(...msg) {
    const error = chalk.bold.red
    console.error(error(...msg))
  }
  static color(color, ...msg) {
    const Color = chalk.keyword(color)
    console.log(Color(...msg))
  }
}

export default Logger
