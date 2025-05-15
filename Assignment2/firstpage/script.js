document.getElementById('startBtn').addEventListener('click', function () {
  window.location.href = '/Assignment2/guide/index.html';
});

// Play hover sound on start button
const hoverSound = document.getElementById('hoverSound');
document.getElementById('startBtn').addEventListener('mouseenter', () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
});

// Volume control
const volumeIcon = document.getElementById('volumeIcon');
const bgm = document.getElementById('bgm');
let isMuted = false;

volumeIcon.addEventListener('click', () => {
  isMuted = !isMuted;
  bgm.muted = isMuted;
  volumeIcon.src = isMuted ? 'volumeoff.png' : 'volume.png';
});
