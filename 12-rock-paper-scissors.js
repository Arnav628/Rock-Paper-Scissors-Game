let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses:0,
  tie:0
};

updateScore();

let isAutoPlaying=false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId=setInterval(() => {
      const playermove=pickComputerMove();
      playGame(playermove);
    },1000 );

    isAutoPlaying=true;
    document.querySelector('.auto-play-button')
    .innerHTML = 'Stop Playing';
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying=false;
    document.querySelector('.auto-play-button')
    .innerHTML = 'Auto Play';

  }

}


document.querySelector('.rock-button').addEventListener('click' , ()=>{
  playGame('rock')
});

document.querySelector('.paper-button').addEventListener('click' , ()=>{
  playGame('paper')
});

document.querySelector('.scissor-button').addEventListener('click' , ()=>{
  playGame('scissors')
});

document.body.addEventListener('keydown', (event)=>{
  if(event.key==='r'){
    playGame('rock');
    console.log('event');
  }
  else if(event.key==='p'){
    playGame('paper');
  }
  else if(event.key==='s'){
    playGame('scissors');
  }
  else if(event.key==='a'){
    autoPlay();
  }
  else if(event.key==='Backspace'){
    resetConformation();
  }
});

document.querySelector('.auto-play-button').addEventListener     ('click' ,  ()=>{
  autoPlay()
});

// myButton=document.querySelector('.auto-play-button');
// let isButtonInInitialState = true;


// myButton.addEventListener('click', () => {
//   if (isButtonInInitialState) {
//     myButton.textContent = 'Stop Playing';
//     isButtonInInitialState=false;
//   } else {
//     myButton.textContent = 'Auto play';
//     isButtonInInitialState=true;
//   }
// });

document.querySelector('.reset-button').addEventListener('click' , ()=>{
  resetConformation();
});

function resetScore(){
  score.wins=0;
  score.losses=0;
  score.tie=0;
  localStorage.removeItem('score');
  updateScore();
}

function resetConformation(){
  document.querySelector('.js-reset-confirmation').innerHTML= `
  Are you sure want to reset the score?
  <button class="yes-button">Yes</button>
  <button class="no-button">No</button>`;

  document.querySelector('.yes-button').addEventListener('click' , ()=>{
    resetScore();
    hideConformation();
  } );

  document.querySelector('.no-button').addEventListener('click' , ()=>{
    hideConformation();
  } );

}

function hideConformation(){
  document.querySelector('.js-reset-confirmation').innerHTML='';
}


function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'scissors') 
  {
    if (computerMove === 'rock') {
      result = 'You lose.';
      score.losses++;
    } else if (computerMove === 'paper') {
      result = 'You win.';
      score.wins++;
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
      score.tie++;
    }

  } 
  else if (playerMove === 'paper') 
  {
    if (computerMove === 'rock') {
      result = 'You win.';
      score.wins++;
    } else if (computerMove === 'paper') {
      result = 'Tie.';
      score.tie++;
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
      score.losses++;
    }
    
  } 
  else if (playerMove === 'rock') 
  {
    if (computerMove === 'rock') {
      result = 'Tie.';
      score.tie++;
    } else if (computerMove === 'paper') {
      result = 'You lose.';
      score.losses++;
    } else if (computerMove === 'scissors') {
      result = 'You win.';
      score.wins++;
    }
  }

  localStorage.setItem('score' , JSON.stringify(score));
  
  updateScore();

  document.querySelector('.js-result').innerHTML=`${result}`;

  document.querySelector('.js-moves').innerHTML=`You <img class="move-icon" src="images/${playerMove}-emoji.png"> 
  <img class="move-icon" src="images/${computerMove}-emoji.png">  Computer`;        

}

function updateScore(){
  document.querySelector('.js-score')
  .innerHTML=`wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.tie}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}
