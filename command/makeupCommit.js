'use strict'
const co = require('co')
const prompt = require('co-prompt')
const logger = require('../src/logger')
const execPromise = require('../src/exec-promise')
const { getDate } = require('../src/date')
const { getToken } = require('../src/token')
const { readFilePromise } = require('../src/oper-file')
const { getCommits } = require('../src/commits')

/**
 * 生成 git commit -m “xxx” 语句
 * @param {*} message 传入的 “xxx”
 *
 */
async function generateGitCommitMessage(message) {
  const userInfo = await getToken()
  // console.log('userInfo', userInfo)

  const username = userInfo.name
  if (!username) {
    logger.fail('you do not have a username of github.')
    return
  }

  const commitsArray = await getCommits(username)

  const timeString = commitsArray ? await getDate(username, commitsArray) : await getDate(username)
  // console.log('commitsArray', timeString)

  let template = `git commit --date="${timeString}" -am "${message}" && git push`
  return template
}

module.exports = () => {
  co(function* () {
    let [a, b, target, ...params] = process.argv
    let message = params[0]

    if (!message) {
      message = yield prompt('commit message: ')
    }

    generateGitCommitMessage(message).then(cmd => {
      console.log(cmd)
      execPromise(cmd).then(resp => {
        logger.success(resp)
      }).catch(err => {
        logger.fail(err)
      })

    })
  })
}
