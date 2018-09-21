'use strict'
const co = require('co')
const prompt = require('co-prompt')
const request = require('request');
const ora = require('ora');
const logger = require('../src/logger')

module.exports = () => {
  co(function* () {

    let [a, b, target, ...params] = process.argv
    let packageName = params[0]

    if (!packageName) {
      packageName = yield prompt('Package name: ')
    }
    let isExist = false

    const spinner = ora('querying ...')
    spinner.start()

    request(`https://www.npmjs.com/package/${packageName}`, (error, response, body) => {
      spinner.stop()
      if (!error) {
        isExist = response.statusCode !== 404
        if (isExist) {
          logger.fail(`Package named ${packageName} is already existed!`)
        } else {
          logger.success(`Package named ${packageName} is not already existed!`)
        }
        process.exit()

      } else {
        logger.fail("error" + error)
        process.exit()
      }
    })

  })
}
