let startTime;
let elapsedTime = 0;
let timerInterval;
let isPaused = false;
let isStarted = false;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');

const pauseSound = document.getElementById('pauseSound');
const resumeSound = document.getElementById('resumeSound');
const resetSound = document.getElementById('resetSound');
const startSound = document.getElementById('startSound');

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function playSound(audio) {
  audio.currentTime = 0; // Reset audio to start
  audio.play();
}

function startTimer() {
    if (!isStarted) {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
      }, 10);
      startBtn.disabled = true;
      pauseBtn.textContent = 'Pause';
      isPaused = false;
      isStarted = true;
      playSound(startSound); // Play start sound
    } else if (isPaused) {
      // Resume the timer
      timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
      }, 10);
      startBtn.disabled = true;
      pauseBtn.textContent = 'Pause';
      isPaused = false;
      playSound(resumeSound); // Play resume sound
    }
  }
  
  function pauseTimer() {
    if (!isPaused) {
      clearInterval(timerInterval);
      pauseBtn.textContent = 'Resume';
      isPaused = true;
      playSound(pauseSound); // Play pause sound
    } else {
      startTimer(); // Resume the timer
    }
  }
  


function resetTimer() {
  clearInterval(timerInterval);
  display.textContent = '00:00';
  elapsedTime = 0;
  startTime = null; // Reset start time
  startBtn.disabled = false;
  isPaused = false;
  isStarted = false; // Reset started status
  playSound(resetSound); // Play reset sound
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
