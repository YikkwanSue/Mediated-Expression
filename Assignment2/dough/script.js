const dough = document.querySelector('.dough');
const tool = document.querySelector('.tool-icon');
const audio = new Audio('dough.wav');

let isPlaying = false;
let toolActive = false;

// Smooth morph speed
let targetSpeed = 12;
let currentSpeed = 12;

function animate() {
  currentSpeed += (targetSpeed - currentSpeed) * 0.05;
  dough.style.animationDuration = `${currentSpeed}s`;
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', (e) => {
  const ratioX = e.clientX / window.innerWidth;
  targetSpeed = 6 + ratioX * 6;

  // Move tool if picked up
  if (toolActive) {
    tool.style.left = `${e.clientX - 32}px`; // Centered
    tool.style.top = `${e.clientY - 32}px`;
  }
});

// Click to pick up or drop the tool
tool.addEventListener('click', () => {
  toolActive = !toolActive;
  if (toolActive) {
    tool.classList.add('tool-following');
  } else {
    tool.classList.remove('tool-following');
  }
});

// Only play sound if tool is active and interacting with dough
dough.addEventListener('mousemove', () => {
  if (toolActive && !isPlaying) {
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    setTimeout(() => isPlaying = false, 200);
  }
});
