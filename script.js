// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    display.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - elapsedTime * 1000;
    timer = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (!isRunning) return;
    lapCount++;
    const lapTime = Math.floor(elapsedTime / 60) + ':' + String(elapsedTime % 60).padStart(2, '0');
    const lapElement = document.createElement('div');
    lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
