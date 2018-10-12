'use strict'
const logger = require('../src/logger')
const { getToken } = require('../src/token')
const { readFilePromise } = require('../src/oper-file')
const { parser } = require('../src/commits')

/**
 * 强制更新 commits 数据
 */
module.exports = async () => {
  const userInfo = await getToken()
  // console.log('userInfo', userInfo)

  const username = userInfo.name
  if (!username) {
    logger.fail('you do not have a username of github.')
    return
  }

  await parser(username)
}
