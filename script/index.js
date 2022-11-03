import {tweetsData} from "./data.js"
import {saveLocalStorage, readLocalStorage, getData} from "./utils.js"


const twimbaFeed =  getData(tweetsData)


function generarHtml() {
  let html = ''
  twimbaFeed.forEach(tweet => {
    let replyHtml = ''

    if(tweet.replies.length > 0) {
      tweet.replies.forEach(reply => {
        replyHtml += `
        <div class="tweet-reply">
        <div class="tweet">
          <img src="${reply.profilePic}" alt="avatar" class="avatar">
          <div class="tweet-contenido">
            <p class="tweet-usuario">${reply.handle}</p>
            <p>${reply.tweetText}</p>
          </div>
        </div>
      </div>
        `
      })
    }
    html += `
    <section class="tweet">
    <img class="avatar" src="${tweet.profilePic}" alt="Avatar">
    <div class="tweet-contenido">
      <p class="tweet-usuario">${tweet.handle}</p>
      <p>${tweet.tweetText}</p>
      <div class="tweet-interacciones">
        <span class="tweet-interaccion" ><i class="fa-regular fa-comment-dots"></i>2</span>
        <span class="tweet-interaccion" ><i class="fa-regular fa-heart"></i>22</span>
        <span class="tweet-interaccion" ><i class="fa-solid fa-retweet"></i>222</span>
        <span class="tweet-interaccion" ><i class="fa-regular fa-reply"></i></span>
      </div>
      ${replyHtml}
    </div>
  </section>
    `
  });
  return html
}

function renderHTML() {
  document.querySelector('#tweet-feed').innerHTML = generarHtml()
}

renderHTML()

