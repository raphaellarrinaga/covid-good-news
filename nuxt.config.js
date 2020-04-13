const env = require('dotenv').config()
const axios = require('axios')
const _ = require('lodash')
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const SHEET_DATA_SOURCE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/14xi3-UP9TpUs6ZfxwhJiluJneqqpXHY27Me5b_NCDo4/values/Content!A1:I1000?key='+ GOOGLE_API_KEY

export default {
  mode: 'spa',
  /*
  ** Merge environment variables.
  */
  env: env.parsed,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/feed']
  ],
  feed: [
    // A default feed configuration object
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: 'Covid Good News',
          link: 'https://covidgoodnews.be/feed.xml',
          description: 'Feed for Covid Good News, a focus and list of positive news, facts and random stuff related to Covid-19.'
        }

        const response = await axios.get(SHEET_DATA_SOURCE_URL)
        const rows = response.data.values
        const properties = rows.shift()
        const articles = []
        for (const i in rows) {
          articles.push(_.zipObject(properties, rows[i]))
        }

        const aReversed = articles.reverse();
        const news = aReversed.filter(item => !item.Instagram)
        news.forEach(post => {
          feed.addItem({
            title: post.Label,
            id: post.Url,
            link: post.Url,
            description: 'Published on '+ post.PublicationDate + ', source: ' + post.Source,
          })
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
