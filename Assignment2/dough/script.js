const dough = document.querySelector('.dough');
const tool = document.getElementById('tool');

let isPlaying = false;
let toolHeld = false;

// Dough morph animation
let targetSpeed = 25;
let currentSpeed = 25;

function animate() {
  currentSpeed += (targetSpeed - currentSpeed) * 0.1;
  dough.style.animationDuration = `${currentSpeed}s`;
  requestAnimationFrame(animate);
}
animate();

// Mousemove
window.addEventListener('mousemove', (e) => {
  const ratioX = e.clientX / window.innerWidth;
  const ratioY = e.clientY / window.innerHeight;

  const topLeft = 40 + ratioX * 60;
  const topRight = 60 - ratioX * 30;
  const bottomRight = 50 + ratioY * 30;
  const bottomLeft = 50 - ratioY * 30;

  const radius = `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}% / ${bottomLeft}% ${topLeft}% ${topRight}% ${bottomRight}%`;
  dough.style.borderRadius = radius;

  targetSpeed = 7 + ratioX * 7;

  if (toolHeld) {
    tool.style.left = `${e.clientX - tool.offsetWidth / 2}px`;
    tool.style.top = `${e.clientY - tool.offsetHeight / 2}px`;
  }
});

// Click to pick up the tool
tool.addEventListener('click', (e) => {
  e.stopPropagation();
  toolHeld = true;
  tool.style.cursor = 'grabbing';
});

