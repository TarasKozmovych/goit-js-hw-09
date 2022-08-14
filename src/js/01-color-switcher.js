const refs = {
    bodyColor: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start'),
    stopBtn: document.querySelector('button[data-stop'),
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

function onStartBtn(e) {
    intervalId = setInterval(() => {
        refs.bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.startBtn.disabled = true;
};
function onStopBtn() {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
}

