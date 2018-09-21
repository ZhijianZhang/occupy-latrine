const { exec } = require('child_process');
const logger = require('../src/logger')


module.exports = cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        logger.fail('err: ' + err)
        reject(err)
        process.exit()
      } else {
        logger.success('Exec Success ')
        resolve(stdout)
      }
    });
  })

}
