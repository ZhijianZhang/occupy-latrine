const chalk = require('chalk')

console.rocket = console.log.bind(console, '🚀', ' ');
console.skull = console.log.bind(console, '💀', ' ');
console.finish = console.log.bind(console, '🔥', ' ');

exports.info = (...args) => {
  console.log(chalk.white(args))
}

exports.success = (...args) => {
  console.rocket(chalk.green(args))
}

exports.fail = (...args) => {
  console.skull(chalk.red(args))
}

exports.finish = (...args) => {
  console.finish(chalk.red(args))
}