'use strict'
const co = require('co')
const prompt = require('co-prompt')
const request = require('request');
const ora = require('ora');
const logger = require('../src/logger')
const execPromise = require('../src/exec-promise')
const exists = require('fs').existsSync
const tokenUtils = require('../src/token')

module.exports = async () => {
  const token = await tokenUtils.getToken()
  // console.log('token: ', token)

  co(function* () {

    let [a, b, target, ...params] = process.argv
    let packageName = params[0]

    if (!packageName) {
      packageName = yield prompt('Package name: ')
    }
    let isExist = false

    let gitUserName = token.name
    let gitToken = token.token

    if (!token || !token.name) {
      gitUserName = yield prompt('git username: ')
    } else {
      logger.info(`Hi, ${gitUserName}`)
    }

    if (!token || !token.token) {
      gitToken = yield prompt('github token: ')
    } else {
      logger.info(`you had saved token: ${gitToken}`)
    }

    // 异步任务，写token
    if (gitUserName && gitToken)
      tokenUtils.saveToken(gitUserName, gitToken)

    // let gitUserName = 'gnailiy'
    // let gitToken = '0e308d8e308fb36c255cc17ebe1212a1073fa3db'

    let filename = process
      .cwd()
      .replace(/[\\]/g, '/') + '/' + packageName

    // FIXME:
    // 如果就在当前项目目录 xxx 下执行 latrine g xxx 会不成功
    if (exists(packageName)) {
      const gitInitCmd = `cd ${packageName} && git init && git add . && git commit -m 'occupy-latrine first commit.'`
      const createRepoCmd = `curl -u "${gitUserName}:${gitToken}" https://api.github.com/user/repos -d '{"name":"${packageName}"}'`

      // todo
      // 如果用户给的token权限不够，创建repo会失败，最好提示一下，而不是在之后报拉取repo失败的错误

      const spinner = ora('working ...')
      spinner.start()

      execPromise(gitInitCmd).then(resp => {
        logger.success('gitInitCmd: git init success.')

        execPromise(createRepoCmd).then(resp => {
          logger.success('createRepoCmd: create repo success.')

          const commitCmd = `cd ${packageName} && git remote add origin https://github.com/${gitUserName}/${packageName}.git&& git push -u origin master`
          execPromise(commitCmd).then(resp => {
            spinner.stop()
            logger.success('commitCmd: repo first commit success.')
            logger.finish('Finish.')
            process.exit()
          }, err => {
            spinner.stop()
            logger.fail('repo first commit fail.')
          })
        }, err => {
          logger.fail('create repo fail.')
        })
      }, err => {
        logger.fail('git init fail.')
      })
    } else {
      // cmd = `mkdir ${packageName} && cp ${templateSrc}/* ${filename}`
    }

  })
}
