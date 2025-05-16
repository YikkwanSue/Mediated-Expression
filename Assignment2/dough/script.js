const dough = document.querySelector('.dough');
const tool = document.querySelector('.tool-icon');
const audio = new Audio('dough.wav');

let isPlaying = false;
let toolActive = false;

// Smooth animation speed (for fallback if needed)
let targetSpeed = 25;
let currentSpeed = 25;

function animate() {
  currentSpeed += (targetSpeed - currentSpeed) * 0.1;
  dough.style.animationDuration = `${currentSpeed}s`;
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('mousemove', (e) => {
  const ratioX = e.clientX / window.innerWidth;
  const ratioY = e.clientY / window.innerHeight;

  // Adjust border-radius based on mouse
  const topLeft = 40 + ratioX * 60;
  const topRight = 60 - ratioX * 30;
  const bottomRight = 50 + ratioY * 30;
  const bottomLeft = 50 - ratioY * 30;

  const radius = `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}% / ${bottomLeft}% ${topLeft}% ${topRight}% ${bottomRight}%`;
  dough.style.borderRadius = radius;

  // Animation speed 
  targetSpeed = 7 + ratioX * 7;
});
