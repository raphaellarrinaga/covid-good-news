const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const SHEET_DATA_SOURCE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/14xi3-UP9TpUs6ZfxwhJiluJneqqpXHY27Me5b_NCDo4/values/Content!A1:I1000?key='+ GOOGLE_API_KEY
const axios = require('axios')
const _ = require('lodash')
const { join, resolve } = require('path')
const { promisify } = require('util')
const { writeFileSync } = require('fs')

module.exports = async function (moduleOptions) {
  this.nuxt.hook('generate:before', async () => {
    const response = await axios.get(SHEET_DATA_SOURCE_URL)
    const rows = response.data.values
    const properties = rows.shift()
    const articles = []
    for (const i in rows) {
      articles.push(_.zipObject(properties, rows[i]))
    }
    const aReversed = articles.reverse();
    const data = JSON.stringify(aReversed)
    // const distGeneratePath = resolve(this.options.rootDir, join(this.options.generate.dir, '/cgnData.json'))
    const distGeneratePath = resolve(this.options.rootDir, join(this.options.alias.static, '/cgnData.json'))
    try { writeFileSync(distGeneratePath, data, 'utf-8'); }
    catch(e) { console.log('Failed to save cgnData.json'); }
  })
}
