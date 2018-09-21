'use strict'
const co = require('co')
const prompt = require('co-prompt')
const logger = require('../src/logger')
const path = require('path');
const fs = require('fs')
const exists = require('fs').existsSync
const { exec } = require('child_process');

const getGitUser = require('../src/git-user')
const operFile = require('../src/oper-file')
const execPromise = require('../src/exec-promise')

const author = getGitUser()

module.exports = () => {
  co(function* () {
    let [a, b, target, ...params] = process.argv
    let packageName = params[0]

    if (!packageName) {
      packageName = yield prompt('Package name: ')
    }

    let filename = process
      .cwd()
      .replace(/[\\]/g, '/') + '/' + packageName

    let templateSrc = path.join(__dirname, '../template')

    let cmd
    if (exists(packageName)) {
      cmd = `cp ${templateSrc}/* ${filename}`
      logger.info('已存在该目录， 请更换目录或包名之后重试')
      process.exit()
    } else {
      cmd = `mkdir ${packageName} && cp ${templateSrc}/* ${filename}`
    }

    execPromise(cmd).then(resp => {

      // 修改 template 模板的值
      // 只修改 package.json
      const packageJsonSrc = filename + '/' + 'package.json'
      operFile.readFilePromise(packageJsonSrc).then(data => {
        const newData = {
          ...JSON.parse(data),
          author: author.name,
          email: author.email,
          name: packageName
        }

        operFile.writeFilePromise(packageJsonSrc, newData).then(data => {
          logger.success('写入成功')
          logger.info('退出进程。。。')
        }, err => {
          logger.fail('写入失败')
          logger.info('退出进程。。。')
          process.exit()
        })

      }, err => {
        logger.fail('err' + err)
        logger.info('退出进程。。。')
        process.exit()
      })


      // publish 发布npm包
      // 如果没有登录npm 需要手动先登录npm。
      const publishCmd = `cd ${filename} && npm publish`

      exec(publishCmd, (err, stdout, stderr) => {
        if (err) {
          logger.fail('Publish Fail ... ' + err)
          process.exit()
        } else {
          logger.success('Publish Success ...')
          process.exit()
        }
      });

      // todo
      // 增加一个参数 --git, 创建一个github仓库

    })
  })
}
