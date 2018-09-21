const { exec } = require('child_process');
const chalk = require('chalk')

module.exports = cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.red('err: ' + err))
        reject(err)
        process.exit()
      } else {
        console.log(chalk.green('Copy Success'))
        resolve({
          msg: 'ok'
        })
      }
    });
  })

}
