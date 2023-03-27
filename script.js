const countdownButtons = document.getElementById('countdown-buttons');
const startButtons = document.getElementById('start-buttons');
const startCountdownButton = document.getElementById('start-countdown');
const pauseCountdownButton = document.getElementById('pause-countdown');
const goBackButton = document.getElementById('go-back');
const countdownTimer = document.getElementById('countdown-timer');
const countdownButtonElements = document.querySelectorAll('.countdown-button');
const resetCountdownButton = document.querySelector('#reset-countdown');

let time;
let intervalId;
let paused = false;

function startTimer(duration) {
  let timer = duration, minutes, seconds;
  countdownTimer.style.display = 'inline-block'; // Display the timer
  intervalId = setInterval(function () {
    if (!paused) { // check if countdown is not paused
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      countdownTimer.innerHTML = `<div id="timer-clock"><span>${minutes}</span><span>${seconds}</span></div>`;

      if (--timer < 0) {
        clearInterval(intervalId);
        alert("Time's up!");
      }
    }
  }, 1000);
}

function handleCountdownButtonClick(event) {
  time = 0;
  const buttonId = event.target.id;
  switch (buttonId) {
    case 'bank-robbery':
      time = 300;
      break;
    case 'high-speed-chase':
      time = 600;
      break;
    case 'hostage-situation':
      time = 900;
      break;
    case 'bomb-defusal':
      time = 1200;
      break;
  }
  startButtons.style.display = 'block';
  countdownButtons.style.display = 'none';
  clearInterval(intervalId);
  countdownTimer.textContent = "";
}

function startCountdown() {
  startTimer(time);
  startCountdownButton.style.display = 'none';
  pauseCountdownButton.style.display = 'inline-block';
  resetCountdownButton.style.display = 'inline-block';
  if (typeof intervalId !== 'undefined') {
    pauseCountdownButton.textContent = 'Pause';
  } else {
    pauseCountdownButton.textContent = 'Continue';
  }
}

function pauseCountdown() {
  paused = !paused; // toggle paused variable
  if (paused) {
    pauseCountdownButton.textContent = 'Continue';
  } else {
    pauseCountdownButton.textContent = 'Pause';
  }
}

function goBack() {
  countdownButtons.style.display = 'block';
  startButtons.style.display = 'none';
  clearInterval(intervalId);
  countdownTimer.textContent = "";
  paused = false;
  pauseCountdownButton.style.display = 'none';
  startCountdownButton.style.display = 'inline-block';
  pauseCountdownButton.textContent = 'Pause';
  resetCountdownButton.style.display = 'none';
}

function resetCountdown() {
  clearInterval(intervalId);
  intervalId = undefined;
  countdownTimer.textContent = '';
  startCountdownButton.style.display = 'inline-block';
  pauseCountdownButton.style.display = 'none';
  paused = false;
  resetCountdownButton.style.display = 'none';
  pauseCountdownButton.textContent = 'Pause';
}

startButtons.style.display = 'none';

countdownButtonElements.forEach(function(countdownButton) {
  countdownButton.addEventListener('click', handleCountdownButtonClick);
});

startCountdownButton.addEventListener('click', startCountdown);
pauseCountdownButton.addEventListener('click', pauseCountdown);
resetCountdownButton.addEventListener('click', resetCountdown);
goBackButton.addEventListener('click', goBack);
