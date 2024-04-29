let startTime;
let elapsedTime = 0;
let timerInterval;
let isPaused = false;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');

const pauseSound = document.getElementById('pauseSound');
const resumeSound = document.getElementById('resumeSound');

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
  startBtn.disabled = true;
  pauseBtn.textContent = 'Pause';
  isPaused = false;
}

function pauseTimer() {
  if (!isPaused) {
    clearInterval(timerInterval);
    pauseBtn.textContent = 'Resume';
    isPaused = true;
    playAudio(pauseSound); // Play pause sound
  } else {
    startTimer();
    playAudio(resumeSound); // Play resume sound
  }
}

function playAudio(audio) {
  audio.currentTime = 0; // Reset audio to start
  audio.play();
}

function resetTimer() {
  clearInterval(timerInterval);
  display.textContent = '00:00';
  elapsedTime = 0;
  startBtn.disabled = false;
  isPaused = false;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
