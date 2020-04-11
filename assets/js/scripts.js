// @see https://codepen.io/tech-lifestyle/pen/gHsDh

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/14xi3-UP9TpUs6ZfxwhJiluJneqqpXHY27Me5b_NCDo4/edit?usp=sharing';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    orderby: 'Date',
    simpleSheet: false
  })
}

function showInfo(data, tabletop) {
  var elems = data.Content.elements;
  var items = [];

  elems.forEach(function(item){
    var article = document.createElement("article");
    article.classList.add('article');
    article.innerHTML = '';

    var articleContent = document.createElement("div");
    articleContent.classList.add('article__content');

    var metas = document.createElement("p");
    metas.classList.add('article__metas');

    if (item.PublicationDate) {
      metas.innerHTML += '<time>'+ item.PublicationDate +'</time>';
    }
    if (item.Source) {
      metas.innerHTML += '<span>' + item.Source + '</span>';
    }

    if (item.Belgium) {
      article.innerHTML += '<span class="article__zone">🇧🇪</span>';
    }
    if (item.International) {
      article.innerHTML += '<span class="article__zone">🌍</span>';
    }
    if (item.Url && item.Label) {
      articleContent.innerHTML += '<a href="'+ item.Url +'"><span>'+ item.Label +'</span></a>';
    } else if (item.Url) {
      articleContent.innerHTML += '<a href="'+ item.Url +'">'+ item.Url +'</a>';
    }

    // articleContent.innerHTML += metas;
    // article.innerHTML += articleContent;
    articleContent.appendChild(metas);
    article.appendChild(articleContent);

    if (item.Instagram) {
      setTimeout(() => {
        renderIgPost("https://api.instagram.com/oembed?omitscript=true&url=" + item.Url);
      }, 300);
    } else {
      document.getElementById("news").prepend(article);
    }
  });

  // document.getElementById("output").innerHTML = items;
  // document.getElementById("output").appendChild(items);
}

function renderIgPost(url) {
  var embed = document.getElementById('medias');
  var req = new XMLHttpRequest;
  req.open("GET", url);
  req.send()
  req.addEventListener("load", function(){
    parsed = JSON.parse(req.responseText);
    var article = document.createElement('div');
    article.classList.add('media');
    article.innerHTML = parsed.html;
    embed.prepend(article);
    instgrm.Embeds.process();
  });
}

function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum/1000;
}

init()
