const cheerio = require('cheerio')
const https = require("https");
const logger = require('./logger')
const operFile = require('../src/oper-file')
const { isOverdue, clockNow } = require('../src/history')
const { getCacheCommits } = require('../src/date')

/**
 * download 一个 html dom 数据
 * @param {*} url 
 */
function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, function (res) {
      let data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function () {
        resolve(data);
      });
    }).on("error", function () {
      reject(null);
    });
  })
}

/**
 * 解析html
 * @param {*} username 
 */
async function parser(username) {
  let tempFileName = `/Users/yiliang/projects/personal/github/occupy-latrine/temp/${username}.html`
  if (!username) {
    logger.fail('请输入需要解析的github账户名')
    return
  }

  // const readFileResult = await operFile.readFilePromise(tempFileName)

  // let $ = cheerio.load(readFileResult)
  // if (!readFileResult) {
  //   let url = `https://github.com/${username}`
  //   const result = await download(url)
  //   $ = cheerio.load(result)
  // }

  //获取html
  // console.info($('header').text());
  //获取文本内容
  //console.info($.text());

  let url = `https://github.com/${username}`
  const result = await download(url)
  let $ = cheerio.load(result)

  // const html = $('html').html()
  // const writeFileResult = await operFile
  //   .writeFilePromise(tempFileName, html)

  // console.log(writeFileResult)

  // 暂存文件，免得每次都访问网络

  // logger.info('writeFileResult', $(header))

  // .is-graph-loading.graph-canvas.calendar-graph.height-full
  const wrapper = $('.js-calendar-graph.is-graph-loading.graph-canvas.calendar-graph.height-full').html()
  const svg = $('g[transform="translate(16, 20)"]', wrapper).html()
  const gList = $('g', svg)

  let jsonResult = {}

  gList.each((i, g) => {
    const rectDom = $(g).children('rect')
    // console.log(rectDom.length)

    let dataCount, dataDate
    rectDom.each((i, rect) => {
      dataCount = $(rect).attr('data-count')
      dataDate = $(rect).attr('data-date')
      jsonResult[dataDate] = dataCount
    })
  })

  const tempJsonFileName = `/Users/yiliang/projects/personal/github/occupy-latrine/temp/${username}.json`

  await operFile.writeFilePromise(tempJsonFileName, jsonResult)
  await clockNow()
  logger.success('download json success')

  return jsonResult
}




/**
 * 通过网络 或者 缓存获取 commits
 * @param {*} username 
 */
async function getCommits(username) {
  // 判断本地存取的 commits 是否过期
  const overdue = await isOverdue()
  logger.info(overdue ? '缓存已过期, 重新拉取 commits.' : '缓存未过期, 读取缓存数据.')
  // 如果过期，就重新读取
  if (overdue) {
    return await parser(username)
  }

  // 如果没有过期，就读取本地文件数据就行
  return await getCacheCommits(username)
}

exports.getCommits = getCommits;
exports.parser = parser;

// test
// getCommits('yiliang114')