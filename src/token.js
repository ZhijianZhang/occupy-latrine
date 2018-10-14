const operFile = require('./oper-file')
const path = require('path')
const { existsSync: exists } = require('fs')
const fs = require('fs')
const logger = require('./logger')

const tokenFileSrc = path.join(__dirname, '../config-token.json')

// console.log('tokenFileSrc', tokenFileSrc)
// 没有文件的话，应该需要创建
// if (!exists(tokenFileSrc)) {
//   const body = {
//     username: '',
//     token: ''
//   }
//   operFile.writeFilePromise(tokenFileSrc, JSON.stringify(body))
// }


function saveToken(username, token) {
  const body = {
    username,
    token
  }
  return operFile.writeFilePromise(tokenFileSrc, body)
}

function delToken() {
  if (exists(tokenFileSrc)) {
    operFile.readFilePromise(tokenFileSrc).then(resp => {
      const body = {
        ...JSON.parse(resp),
        token: ''
      }
      return operFile.writeFilePromise(tokenFileSrc, body)
    })
  }
}

function getToken() {
  if (exists(tokenFileSrc)) {
    return operFile.readFilePromise(tokenFileSrc, 'utf-8', false).then(resp => {
      // console.log('readFile token', resp)
      let result = JSON.parse(resp)
      let body = {
        name: result.username || '',
        token: result.token || ''
      }
      return new Promise((resolve, reject) => {
        resolve(body)
      })
    })
  } else {
    logger.fail('token config file is not existed.')
  }
}

exports.saveToken = saveToken
exports.delToken = delToken
exports.getToken = getToken
