<template>
  <div class="content">
    <div class="page">
      <div class="page-content">
        <header class="page-header">
          <h1 class="page-title">Covid <span>🙌🏼</span> news <small>beta</small></h1>
          <h3 class="page-subtitle">Optimistic infos.</h3>
        </header>
        <div class="news">
          <article
            v-for="article in news"
            :key="article.id"
            class="article">
            <span class="article__zone" v-if="article.International">🌍</span>
            <span class="article__zone" v-if="article.Belgium">🇧🇪</span>
            <div class="article__content">
              <a :href="article.Url">
                <span>{{ article.Label }}</span>
              </a>
              <p
                class="article__metas"
                v-if="article.PublicationDate || article.Source">
                <time v-if="article.PublicationDate">{{ article.PublicationDate }}</time>
                <span v-if="article.Source">{{ article.Source }}</span>
              </p>
            </div>
          </article>
        </div>
        <section class="summary">
          <p><strong>Serious infos:</strong> <a href="https://coronavirus.jhu.edu/map.html">🌍 World Map</a>
          <a href="https://www.info-coronavirus.be/fr/">🧠 SPF</a>
          <a href="https://www.who.int/fr/emergencies/diseases/novel-coronavirus-2019/advice-for-public/q-a-coronaviruses">🏥 OMS</a>
          <a href="https://www.google.com/search?sxsrf=ALeKk01isn7QENus7pXjMNTmDXMJ1yxAAw:1586983716411&q=Coronavirus+Stats&stick=H4sIAAAAAAAAAONgFuLVT9c3NMwySk6OL8zJUULlPmL05hZ4-eOesJTTpDUnrzHacHEFZ-SXu-aVZJZUCulxsUFZKlyCUqg6NRik-LlQhXh2MXF7pCbmlGQElySWFC9iFXTOL8rPSyzLLCotVgCLAQCnsUMMkAAAAA&sxsrf=ALeKk01isn7QENus7pXjMNTmDXMJ1yxAAw:1586983716411&biw=2560&bih=1306">📉 Stats</a></p>
        </section>
        <section class="feedback">
          <p>Come back later & before your leave…</p>
          <a target="_blank" href="javascript:location='mailto:\u0063\u006f\u0076\u0069\u0064\u0067\u006f\u006f\u0064\u006e\u0065\u0077\u0073\u002e\u0063\u006f\u006e\u0074\u0061\u0063\u0074\u0040\u0067\u006d\u0061\u0069\u006c\u002e\u0063\u006f\u006d';void 0"><span>We need more news here</span> <i>👋</i> <span>Please share some</span> <i>📫</i></a>
          <p>This page should improve, send your feedback too.</p>
        </section>
      </div>
    </div>
    <div
      class="medias">
      <client-only placeholder="loading" placeholder-tag="span">
        <div
          v-for="post in insta"
          :key="post.id"
          class="media">
          <instagram-embed
            :url="post.Url"
            :max-width=500
          />
        </div>
      </client-only>
      <p class="media-end">That's all folks!</p>
    </div>

  </div>
</template>

<script>
const axios = require('axios')
const _ = require('lodash')
import InstagramEmbed from 'vue-instagram-embed'
import ClientOnly from 'vue-client-only'

export default {
  async asyncData () {
    const cgnData = await axios.get('/cgnData.json').then(res => res.data)
    const news = cgnData.filter(item => !item.Instagram && item.Url && item.Label)
    const insta = cgnData.filter(item => item.Instagram && item.Url)
    return { insta, news }
  },
  components: {
    ClientOnly,
    InstagramEmbed
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background: #1d2238;
  font: 16px/1.5 "Montserrat", "Helvetica", sans-serif;
  position: relative;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 500;
}

a {
  transition: all .2s ease-in;
}

img, video {
  max-width: 100%;
  vertical-align: middle;
}

.page {
  padding: 2rem 1rem 6rem;
}
@media screen and (min-width: 820px) {
  .page {
    margin-right: 440px;
    padding: 2rem 3rem 6rem 2rem;
  }
}
@media screen and (min-width: 1000px) {
  .page {
    margin-right: 540px;
  }
}

.page-content {
  margin: 0 auto;
  max-width: 1000px;
}

.page-header {
  color: #fefefe;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-flow: row wrap;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.2rem;
  letter-spacing: .01em;
  line-height: 1;
  margin: 0;
  text-transform: uppercase;
}
  .page-title span {
    font-size: 1.4em;
  }
  .page-title small {
    color: #777fa5;
    display: inline-block;
    font-size: .8rem;
    margin-left: .3rem;
  }

.page-subtitle {
  color: #777fa5;
  font-size: 1rem;
  font-weight: normal;
  line-height: 1;
  margin: 1rem 0 0;
}

/*
 * Summary.
 */

.summary {
  margin-bottom: 2rem;
}
  .summary p {
    margin: 0;
  }
  .summary strong {
    color: #777fa5;
    font-weight: 500;
    margin-bottom: .5rem;
  }
  .summary a {
    background: #2b3546;
    display: inline-block;
    border-radius: 2px;
    color: #777fa5;
    margin-bottom: .5rem;
    margin-right: .5rem;
    text-decoration: none;
    padding: .2rem .5rem .1rem .5rem;
  }
    .summary a:hover {
      background: transparent;
      color: #fefefe;
    }

/*
 * News.
 */

.news {
  margin-bottom: 2rem;
}

.article {
  align-items: flex-start;
  display: flex;
  flex-flow: row nowrap;
  padding: .75rem 0;
}

.article a {
  display: block;
  color: #eaeaea;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 500;
}
  .article span {
    transition: all .2s;
  }
  .article a:hover span {
    box-shadow: inset 0 -0.063em #1d2238, inset 0 -0.156em #777fa5;
    /* #009bff */
    display: inline;
    text-shadow: 0.063em 0.063em #1d2238, -0.063em 0.063em #1d2238, 0.125em 0 #1d2238, -0.125em 0 #1d2238;
  }

.article__zone {
  display: inline-block;
  font-size: .8rem;
  line-height: 2.2;
  margin-right: .65rem;
  padding: .1em .3em;
}

.article__metas {
  color: #777fa5;
  font-size: .85rem;
  margin: .3rem 0 0;
}
  .article__metas time {
    color: #9ba2c5;
    font-weight: 500;
    margin-right: .5rem;
  }

/*
 * Medias.
 */

.medias {
  padding: 0 1rem 4rem;
  text-align: center;
}

@media screen and (min-width: 820px) {
  .medias {
    background: white;
    position: fixed;
    top: 0;
    right: 0;
    width: 440px;
    padding: 2rem 20px 7rem;
    height: 100vh;
    overflow: scroll;
  }
}

@media screen and (min-width: 1000px) {
  .medias {
    width: 540px;
  }
}

.media {
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
}

.media iframe {
  margin-left: auto !important;
  margin-right: auto !important;
}

@media screen and (min-width: 820px) {
  .media {
    max-width: 400px;
  }
}

@media screen and (min-width: 1000px) {
  .media {
    max-width: 500px;
  }
}

.media-end {
  color: #fefefe;
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 5rem;
  margin-top: 2rem;
  text-align: center;
}
  @media screen and (min-width: 820px) {
    .media-end {
      color: #1d2338;
    }
  }

.about {
  color: #777fa5;
  font-size: .8rem;
}
  .about a {
    color: #777fa5;
  }
  .about a:hover {
    text-decoration: none;
  }
  .about p {
    margin-bottom: .5rem;
  }

.feedback {
  color: white;
  text-align: center;
  margin-top: 5rem;
}

.feedback p {
  color: #777fa5;
  margin: 0;
  text-transform: uppercase;
  font-size: .8rem;
  letter-spacing: .05rem;
}
.feedback a {
  color: white;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 1.25rem 0;
  text-decoration: none;
  width: 100%;
}

.feedback i {
  display: inline-block;
  font-style: normal;
}
  .feedback a:hover i {
    animation: wiggle 1s ease-in-out infinite;
  }

.feedback span {
  display: inline-block;
  transition: all .2s;
}
  .feedback a:hover span {
    box-shadow: inset 0 -0.063em #1d2238, inset 0 -0.156em #777fa5;
    display: inline;
    text-shadow: 0.063em 0.063em #1d2238, -0.063em 0.063em #1d2238, 0.125em 0 #1d2238, -0.125em 0 #1d2238;
  }

@keyframes wiggle {
  10%, 90% {
    transform: rotate(-5deg);
  }

  20%, 80% {
    transform: rotate(10deg);
  }

  30%, 50%, 70% {
    transform: rotate(-20deg);
  }

  40%, 60% {
    transform: rotate(20deg);
  }
}
</style>
