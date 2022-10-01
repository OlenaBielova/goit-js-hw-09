function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.disabled = false;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  if (startBtn.disabled) {
    return;
  } else {
    timeID = setInterval(() => {
    document.body.style.backgroundColor = `${(getRandomHexColor())}`;
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
  }
}

function onStopBtnClick() {
  clearInterval(timeID);
  
  startBtn.disabled = false;
  stopBtn.disabled = true;
}


