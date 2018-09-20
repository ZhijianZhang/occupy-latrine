'use strict'
const co = require('co')
const prompt = require('co-prompt')
// const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')
const {exec} = require('child_process');
const path = require('path'); // node内置模块。

module.exports = () => {
  co(function * () {

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

    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.red('err: ' + err))
        process.exit()
      } else {
        console.log(chalk.green('Copy Success'))
        process.exit()
      }
    });

    // fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config),
    // 'utf-8', (err) => {   if (err)     console.log(err)
    // console.log(chalk.green('New template added!\n')) console.log(chalk.grey('The
    // last template list is: \n')) console.log(config)   console.log('\n')
    // process.exit() })
  })
}
