import {tweetsData} from "./data.js"
import {saveLocalStorage, readLocalStorage, getData} from "./utils.js"
import { v4 as uuidv4 } from "https://jspm.dev/uuid";


let twimbaFeed =  getData(tweetsData)

document.addEventListener('click', function(e) {
  if(e.target.id === 'twittear-btn') {
    newTweet()
  }
  if(e.target.dataset.replies) {
    manejarRespuestas(e.target.dataset.replies)
  }
  if(e.target.dataset.likes) {
    manejarlikes(e.target.dataset.likes)
  }
  if(e.target.dataset.retweets) {
    manejarRetweets(e.target.dataset.retweets)
  }
})

function manejarRespuestas(tweetUuid) {
    document.querySelector(`#tweet-replies-${tweetUuid}`).classList.toggle('ocultar-respuesta')
}

function manejarlikes(tweetUuid){
  const tweetEncontrado = twimbaFeed.find(tweet => tweet.uuid === tweetUuid)
  tweetEncontrado.isLiked ? tweetEncontrado.likes-- : tweetEncontrado.likes++
  tweetEncontrado.isLiked = !tweetEncontrado.isLiked
  renderHTML()
}

function manejarRetweets(tweetUuid) {
  const tweetRetituado = twimbaFeed.find(tweet => tweet.uuid === tweetUuid)
  tweetRetituado.isRetweeted ? tweetRetituado.retweets-- : tweetRetituado.retweets++
  tweetRetituado.isRetweeted = !tweetRetituado.isRetweeted
  renderHTML()
}

function newTweet(){
  const twittearInput = document.querySelector('#twittear-input')
  if(twittearInput.value) {
    const newTweetObj = {
      handle: `@bubulazi 👩🏻‍🎤`,
      profilePic: `image/popo.jpg`,
      likes: 0,
      retweets: 0,
      tweetText: `${twittearInput.value}`,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
  }
  twittearInput.value = ''
  twimbaFeed.unshift(newTweetObj)
  saveLocalStorage(twimbaFeed)
  twimbaFeed = readLocalStorage()
  renderHTML()
  }
}


function generarHtml() {
  let html = ''
  twimbaFeed.forEach(tweet => {
    let likesColor = ''
    if(tweet.isLiked) {likesColor = 'red'}
    let retweetsColor = ''
    if(tweet.isRetweeted) {retweetsColor = 'limegreen'}






    let replyHtml = ''
    if(tweet.replies.length > 0) {
      tweet.replies.forEach(reply => {
        replyHtml += `
        <div class="tweet">
          <img src="${reply.profilePic}" alt="Avatar" class="avatar">
          <div class="tweet-contenido">
            <p class="tweet-usuario">${reply.handle}</p>
            <p>${reply.tweetText}</p>
          </div>
        </div>
        `
      })
    }

    html += `
    <section class="tweet">
      <img src="${tweet.profilePic}" alt="Avatar" class="avatar">
        <div class="tweet-contenido">
        <p class="tweet-usuario">${tweet.handle}</p>
        <p>${tweet.tweetText}</p>
        <div class="tweet-interacciones">
          <span class="tweet-interaccion"><i data-replies="${tweet.uuid}" class="fa-regular fa-comment-dots"></i> ${tweet.replies.length}</span>
          <span class="tweet-interaccion"><i style="color: ${likesColor}" data-likes="${tweet.uuid}" class="fa-solid fa-heart"></i> ${tweet.likes}</span>
          <span class="tweet-interaccion"><i style="color:${retweetsColor}" data-retweets="${tweet.uuid}" class="fa-solid fa-retweet"></i> ${tweet.retweets}</span>
          <span class="tweet-interaccion"><i data-reply-tweet="${tweet.uuid}" class="fa-regular fa-reply"></i></span>
        </div>

     <div class="ocultar-respuesta" id="tweet-replies-${tweet.uuid}">
      ${replyHtml}
    </div>
    
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
























// document.addEventListener('click', function(e){
//   if(e.target.dataset.like){
//      handleLikeClick(e.target.dataset.like) 
//   }
//   else if(e.target.dataset.retweet){
//       handleRetweetClick(e.target.dataset.retweet)
//   }
//   else if(e.target.dataset.reply){
//       handleReplyClick(e.target.dataset.reply)
//   }
//   else if(e.target.id === 'tweet-btn'){
//       handleTweetBtnClick()
//   }
// })