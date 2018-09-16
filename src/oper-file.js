const fs = require('fs')
const logger = require('../src/logger')

/**
 * 读取文件
 * TODO: resolve(data) 出去的时候，最好处理 parse 一下
 * @param {*} filename 
 * @param {*} format 
 * @param {*} nologger 不输出 logger (为了不影响用户输入)
 */
exports.readFilePromise = function (filename, format = 'utf-8', nologger = true) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, format, (err, data) => {
      if (err)
        reject(err)
      else {
        nologger && logger.success('read file success!')
        resolve(data)
      }
    })
  })
}

/**
 * 写文件
 * @param {*} filename 
 * @param {*} data 
 * @param {*} format 
 * @param {*} nologger 
 */
exports.writeFilePromise = function (filename, data, format = 'utf-8', nologger = true) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data), format, (err) => {
      nologger && logger.info('writing...')
      if (err) {
        logger.fail('err' + err)
        reject(err)
      } else {
        nologger && logger.success('write file success ...!')
        resolve({
          msg: 'ok'
        })
      }
    })
  })
}

/**
 * 判断文件是否存在
 * @param {*} dirName 
 */
exports.existsPromise = function (dirName) {
  return new Promise((resolve, reject) => {
    fs.exists(dirname, exists => {
      if (exists) {
        logger.info(dirname, 'is existent')
        resolve(exists)
      } else {
        logger.fail(dirname, 'is not non-existent')
        reject(exists)
      }
    })
  })
}



