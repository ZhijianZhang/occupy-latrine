'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const request = require('request');

module.exports = () => {
  co(function* () {

    let packageName = yield prompt('Package name: ')
    let isExist = false
    // todo 打印加载中。。。。
    console.log(chalk.blue("querying ..."))

    request(`https://www.npmjs.com/package/${packageName}`, function (error, response, body) {
      if (!error) {
        isExist = response.statusCode !== 404
        if (isExist) {
          console.log(chalk.red(`Package named ${packageName} is already existed!`))
        } else {
          console.log(chalk.green(`Package named ${packageName} is not already existed!`))
        }
        process.exit()

      } else {
        console.log(chalk.red("error" + error))
        process.exit()
      }
    })

  })
}
