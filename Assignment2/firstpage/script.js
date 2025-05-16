// Navigation
document.getElementById('startBtn').addEventListener('click', function () {
  window.location.href = '/Assignment2/guide/index.html';
});

// Play hover sound on start button
const hoverSound = document.getElementById('hoverSound');
document.getElementById('startBtn').addEventListener('mouseenter', () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
});

// Volume to mute it
const volumeIcon = document.getElementById('volumeIcon');
const bgm = document.getElementById('bgm');
let isMuted = false;

// Set initial volume
bgm.volume = 1.0;

// !! check mdn web doc if not working
const enableAudio = () => {
  if (!bgm.paused) return;

  bgm.play().catch((err) => console.warn("Autoplay blocked:", err));
  document.removeEventListener('click', enableAudio);

  const notice = document.getElementById('bgmNotice');
  if (notice) notice.style.display = 'none';
};
document.addEventListener('click', enableAudio);

// Volume toggle icon
volumeIcon.addEventListener('click', (e) => {
  e.stopPropagation(); 
  isMuted = !isMuted;
  bgm.muted = isMuted;
  volumeIcon.src = isMuted ? 'volumeoff.png' : 'volume.png';
});
