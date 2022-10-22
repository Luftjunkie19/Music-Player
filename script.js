const controlBtn = document.querySelector(`.btn.control`);
const stopBtn = document.querySelector(`.btn.stop`);
const audio = document.querySelector(`audio`);
const progressBar = document.querySelector(`#progrress`);
const timeContainer = document.querySelector(`.time-show`);
const imageHolder = document.querySelector(`.image`);
const loopSign = document.querySelector(`.fas.fa-repeat.fa-2x`);
const volumeSign = document.querySelector(`.btn.volume`);
const volumeBar = document.querySelector(`#progrress-volume`);

const playPause = function () {
  if (audio.paused) {
    audio.play();
    controlBtn.innerHTML = `<i class="fas fa-pause fa-2x"></i>`;
    imageHolder.classList.add(`active`);
  } else {
    audio.pause();
    controlBtn.innerHTML = `<i class="fas fa-play fa-2x"></i>`;
    imageHolder.classList.remove(`active`);
  }
};

const stopSong = function () {
  audio.pause();
  audio.currentTime = 0;
  controlBtn.innerHTML = `<i class="fas fa-play fa-2x"></i>`;
  imageHolder.classList.remove(`active`);
};

const showProgress = function () {
  const currentTime = (audio.currentTime / audio.duration) * 100;
  progressBar.value = currentTime;

  let mins = Math.floor(audio.currentTime / 60);

  mins = mins < 10 ? `0` + mins : mins;

  let sec = Math.floor(audio.currentTime % 60);

  sec = sec < 10 ? `0` + sec : sec;

  timeContainer.innerHTML = `${mins}:${sec}`;
};

const setShowProgress = function () {
  audio.currentTime = (+progressBar.value * audio.duration) / 100;
};

const loopSong = function () {
  audio.play();
  controlBtn.innerHTML = `<i class="fas fa-pause fa-2x"></i>`;
};

const activeLoop = function () {
  loopSign.classList.toggle(`on`);
};

const volumeRegulation = function () {
  audio.volume = +volumeBar.value / 100;

  if (audio.volume === 0.0) {
    volumeSign.innerHTML = `<i class="fa fa-volume-mute fa-2x"></i>`;
  }
};

const volumeQuite = function () {
  audio.volume = 0.0;
  volumeBar.value = `0`;
  volumeSign.innerHTML = `<i class="fa fa-volume-mute fa-2x"></i>`;
};

controlBtn.addEventListener(`click`, playPause);
stopBtn.addEventListener(`click`, stopSong);
audio.addEventListener(`timeupdate`, showProgress);
progressBar.addEventListener(`change`, setShowProgress);
loopSign.addEventListener(`click`, activeLoop);
audio.addEventListener(`ended`, () => {
  if (loopSign.classList.contains(`on`)) {
    loopSong();
  } else {
    stopSong();
  }
});
volumeBar.addEventListener(`change`, () => {
  volumeRegulation();
  volumeSign.innerHTML = `<i class="fa fa-volume-up fa-2x"></i>`;
});
audio.addEventListener(`volumechange`, volumeRegulation);
volumeSign.addEventListener(`click`, volumeQuite);
