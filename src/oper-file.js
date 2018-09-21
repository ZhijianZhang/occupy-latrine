const fs = require('fs')
const logger = require('../src/logger')


exports.readFilePromise = function (filename, format = 'utf-8') {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, format, (err, data) => {
      if (err)
        reject(err)
      else {
        logger.success('read file success!')
        resolve(data)
      }
    })
  })
}


exports.writeFilePromise = function (filename, data, format = 'utf-8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data), format, (err) => {
      logger.info('writing...')
      if (err) {
        logger.fail('err' + err)
        reject(err)
      } else {
        logger.success('write file success ...!')
        resolve({
          msg: 'ok'
        })
      }
    })
  })
}



