'use strict'
const co = require('co')
const prompt = require('co-prompt')
// const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const { exec } = require('child_process');
const path = require('path');
const getGitUser = require('../src/git-user')
const operFile = require('../src/oper-file')
const execPromise = require('../src/exec-promise')

const author = getGitUser()
console.log('author', author.name)

module.exports = () => {
  co(function* () {
    // 分步接收用户输入的参数
    let packageName = yield prompt('Package name: ')

    console.log('process.cwd()', process.cwd())
    let filename = process
      .cwd()
      .replace(/[\\]/g, '/') + '/' + packageName

    let templateSrc = path.join(__dirname, '../template')

    // todo 判断文件夹是否存在
    const cmd = `mkdir ${packageName} && cp ${templateSrc}/* ${filename}`
    console.log('cmd', cmd)

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
        // console.log('newData', newData)
        operFile.writeFilePromise(packageJsonSrc, newData).then(data => {
          console.log('写入成功')
          console.log('退出进程。。。')
        }, err => {
          console.log('写入失败')
          console.log('退出进程。。。')
          process.exit()
        })

      }, err => {
        console.log('err', err)
        console.log('退出进程。。。')
        process.exit()
      })


      // publish 发布npm包
      // 如果没有登录npm 需要手动先登录npm。
      // 通过代码来自动获取 username
      // todo console 输出 emoji
      // && npm publish
      const publishCmd = `cd ${filename} && npm publish`
      exec(publishCmd, (err, stdout, stderr) => {
        if (err) {
          console.log(chalk.red('Publish Fail ... ' + err))
          process.exit()
        } else {
          console.log(chalk.green('Publish Success ...'))
          process.exit()
        }
      });

      // process.exit()


      // todo
      // 增加一个参数 --git, 创建一个github仓库

    })
  })
}
