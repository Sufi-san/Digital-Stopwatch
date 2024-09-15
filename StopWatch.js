let milliSec = 0, runInterval = 0, darkModeON = false, watchRunning = false;

const docBody = document.body;
const header = document.querySelector('header');
const main = document.querySelector('main');
const darkModeBtn = document.querySelector('#dark-mode-btn');
const clockDisp = document.querySelector('#clock-display');
const startStopBtn = document.querySelector('#start-stop-btn');
const resetBtn = document.querySelector('#reset-btn');

const defaultHeadBgColor = header.style.backgroundColor;
const defaultBodyBgColor = docBody.style.backgroundColor;
const defaultMainBgColor = main.style.backgroundColor;
const defaultStartStopBgColor = startStopBtn.style.backgroundColor;
const defaultResetBgColor = resetBtn.style.backgroundColor;

darkModeBtn.addEventListener('click', () => {
    darkModeON = !darkModeON;
    if (darkModeON) {
        darkModeBtn.innerHTML = 'Dark Mode: ON';
        enableDarkMode();
        return;
    }
    darkModeBtn.innerHTML = 'Dark Mode: OFF';
    disableDarkMode();
});

startStopBtn.addEventListener('click', () => {
    if (!watchRunning) {
        startStopBtn.innerHTML = 'Stop';
        runStopWatch();
    }
    else {
        startStopBtn.innerHTML = 'Start';
        haltStopWatch();
    }
    watchRunning = !watchRunning;
});

resetBtn.addEventListener('click', () => {
    milliSec = seconds = minutes = hours = 0;
    startStopBtn.innerHTML = 'Start';
    watchRunning = false;
    haltStopWatch();
});

function enableDarkMode() {
    docBody.style.backgroundColor = 'black';
    header.style.backgroundColor = 'rgb(70,70,70)';
    header.style.color = 'white';
    main.style.backgroundColor = 'rgb(40, 40, 40)';
    clockDisp.style.color = 'white';
    startStopBtn.style.backgroundColor = resetBtn.style.backgroundColor = 'rgb(80, 80, 80)';
}

function disableDarkMode() {
    docBody.style.backgroundColor = defaultBodyBgColor;
    header.style.backgroundColor = defaultHeadBgColor;
    header.style.color = 'black';
    main.style.backgroundColor = defaultMainBgColor;
    clockDisp.style.color= 'black';
    startStopBtn.style.backgroundColor = defaultStartStopBgColor;
    resetBtn.style.backgroundColor = defaultResetBgColor;
}

function runStopWatch() {
    runInterval = setInterval(() => {
        milliSec++;
        renderStopWatch();
    }, 10);
}

function haltStopWatch() {
    clearInterval(runInterval);
    renderStopWatch();
}

function renderStopWatch() {
    const milliSecVal = milliSec % 100;
    const seconds = parseInt(milliSec / 100) % 60;
    const minutes = parseInt(milliSec / (60 * 100)) % 60;
    const hours = parseInt(milliSec / (60 * 60 * 100));
    const msString = (milliSecVal < 10)? '0' + milliSecVal: milliSecVal;
    const secString = (seconds < 10) ? '0' + seconds : seconds;
    const minString = (minutes < 10) ? '0' + minutes : minutes;
    const hrString = (hours < 10) ? '0' + hours : hours;
    clockDisp.innerHTML = `${hrString} : ${minString} : ${secString}.${msString}`;
}
