import {tweetsData} from "./data.js"
import {saveLocalStorage, readLocalStorage, getData} from "./utils.js"
import { v4 as uuidv4 } from "https://jspm.dev/uuid";


let twimbaFeed =  getData(tweetsData)

document.addEventListener('click', function(e) {
  if(e.target.id === 'twittear-btn') {
    newTweet()
  }
  if(e.target.dataset.replies) {
    console.log(e.target.dataset.replies)
  }
})

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
        <span class="tweet-interaccion" ><i data-replies="${tweet.uuid}" class="fa-regular fa-comment-dots"></i> ${tweet.replies.length} </span>
        <span class="tweet-interaccion" ><i data-likes="${tweet.uuid}" class="fa-regular fa-heart"></i> ${tweet.likes.length}</span>
        <span class="tweet-interaccion" ><i data-retweets="${tweet.uuid}" class="fa-solid fa-retweet"></i> ${tweet.retweets.length}</span>
        <span class="tweet-interaccion" ><i data-reply-tweet="${tweet.uuid}"  class="fa-regular fa-reply"></i></span>
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