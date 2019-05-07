const { readFilePromise, writeFilePromise } = require('../src/oper-file')
const { existsSync: exists } = require('fs')

// 缓存时间 1h
const CACHE = 1 * 3600 * 1000

// 记录每次 提交的真实时间
let historyFileName = `/Users/yiliang/projects/personal/nodejs/occupy-latrine/temp/history.json`

/**
 * 记录当前时间到文件中
 */
async function clockNow() {
  const now = new Date()

  await writeFilePromise(historyFileName, {
    LastModified: now.getTime(),
    time: now
  })

}

async function isOverdue() {
  const nowTimestamp = new Date().getTime()

  // 同步
  if (!exists(historyFileName)) return false
  const result = await readFilePromise(historyFileName)

  let { LastModified } = JSON.parse(result)

  if (!LastModified) return false

  return nowTimestamp - LastModified > CACHE
}

exports.clockNow = clockNow;
exports.isOverdue = isOverdue;



// test
// clockNow()
// async function test() {
//   console.log(await isOverdue())
// }

// test()
