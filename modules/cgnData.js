const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const SHEET_DATA_SOURCE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/14xi3-UP9TpUs6ZfxwhJiluJneqqpXHY27Me5b_NCDo4/values/Content!A1:I1000?key='+ GOOGLE_API_KEY
const axios = require('axios')
const _ = require('lodash')
// import fs from 'fs'
// import path from 'path'
const { join, resolve } = require('path')
const { promisify } = require('util')
const { writeFileSync } = require('fs')

// https://github.com/nuxt-community/feed-module/issues/60
// https://github.com/nuxt/nuxt.js/issues/2370
// https://github.com/nuxt/nuxt.js/issues/837
// https://github.com/nuxt/nuxt.js/issues/123
// https://fr.nuxtjs.org/api/configuration-hooks/
// https://nodejs.dev/writing-files-with-nodejs
// https://stackoverflow.com/questions/54622243/add-functions-to-nuxt-config-js
// https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file
// @todo erase file ?
// @todo run on dev, use addServerMiddleware.
// https://github.com/nuxt-community/feed-module/blob/master/lib/module.js
// @todo run automatic build on netlify + hook google sheets on netlify to run build

module.exports = async function (moduleOptions) {
// export default function SimpleModule (moduleOptions) {
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

  // this.addServerMiddleware({
  //   path: '/cgnData.json',
  //   async handler (req, res, next) {
  //     try {
  //       // const xml = await feedCache.get(index)
  //       // res.setHeader('Content-Type', resolveContentType(feedOptions.type))
  //       // res.end(xml)
  //     } catch (err) {
  //       next(err)
  //     }
  //   }
  // })
}
