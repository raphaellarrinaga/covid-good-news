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
    var article = document.createElement("li");

    article.innerHTML = '';
    if (item.Url && item.Label) {
      article.innerHTML += '<a href="'+ item.Url +'">'+ item.Label +'</a>';
    } else if (item.Url) {
      article.innerHTML += '<a href="'+ item.Url +'">'+ item.Url +'</a>';
    }

    // if (item.Language) {
    //   article.innerHTML += '<span>' + item.Language + '</span>';
    // }
    if (item.Belgium) {
      article.innerHTML += '<span>Be</span>';
    }
    if (item.International) {
      article.innerHTML += '<span>International</span>';
    }

    if (item.Instagram) {
      renderIgPost("https://api.instagram.com/oembed?omitscript=true&url=" + item.Url);
    } else {
      document.getElementById("news").appendChild(article);
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
    var newcontent = document.createElement('div');
    newcontent.innerHTML = parsed.html;
    while (newcontent.firstChild) {
      embed.appendChild(newcontent.firstChild);
    }
    instgrm.Embeds.process();
  });
}

init()
