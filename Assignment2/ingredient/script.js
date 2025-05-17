const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

// Setup engine and renderer
const engine = Engine.create();
const world = engine.world;
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: canvas.width,
    height: canvas.height,
    wireframes: false,
    background: '#cdbbff'
  }
});

Render.run(render);
Engine.run(engine);

// World boundaries
const boundaries = [
  Bodies.rectangle(canvas.width / 2, canvas.height + 25, canvas.width, 50, { isStatic: true }),
  Bodies.rectangle(canvas.width / 2, -25, canvas.width, 50, { isStatic: true }),
  Bodies.rectangle(-25, canvas.height / 2, 50, canvas.height, { isStatic: true }),
  Bodies.rectangle(canvas.width + 25, canvas.height / 2, 50, canvas.height, { isStatic: true })
];
World.add(world, boundaries);

// Ingredient colors
const liquidTypes = {
  flour: '#FFC5DB',
  salt: '#57EAE6',
  butter: '#34BA2B',
  water: '#3764F4',
  sugar: '#FFFFFF',
  yeast: '#DDF47D'
};

let currentType = 'water';
let isMouseDown = false;
let mousePos = { x: canvas.width / 2, y: canvas.height / 2 };
let dropInterval = null;

// Sound setup
const sounds = {
  flour: new Audio('flour.wav'),
  salt: new Audio('salt.wav'),
  butter: new Audio('butter.wav'),
  water: new Audio('water.wav'),
  sugar: new Audio('sugar.wav'),
  yeast: new Audio('yeast.wav')
};

function playSound(type) {
  const sound = sounds[type];
  if (sound) {
    sound.currentTime = 0;
    sound.loop = true;
    sound.play();
  }
}

function stopSound(type) {
  const sound = sounds[type];
  if (sound) {
    sound.pause();
    sound.currentTime = 0;
  }
}

// Mouse tracking
canvas.addEventListener('mousemove', event => {
  const rect = canvas.getBoundingClientRect();
  mousePos = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
});

canvas.addEventListener('mousedown', () => {
  isMouseDown = true;
  playSound(currentType);
  dropInterval = setInterval(() => {
    dropLiquid(currentType);
  }, 80);
});

window.addEventListener('mouseup', () => {
  isMouseDown = false;
  clearInterval(dropInterval);
  stopSound(currentType);
});

// Button 
document.querySelectorAll('button[data-type]').forEach(button => {
  const type = button.getAttribute('data-type');
  button.addEventListener('click', () => {
    currentType = type;

    // Play sound when click the button
    nextSound.currentTime = 0;
    nextSound.play().catch((err) => {
      console.error('Failed to play next.wav:', err);
    });
  });
});


function dropLiquid(type) {
  const x = mousePos.x;
  const y = mousePos.y;
  let body;

  if (type === 'sugar') {
    body = Bodies.rectangle(x, y, 21, 21, {
      restitution: 0.5,
      render: { fillStyle: liquidTypes[type] }
    });
  } else if (type === 'yeast') {
    body = Bodies.polygon(x, y, 5, 14, {
      restitution: 0.6,
      render: { fillStyle: liquidTypes[type] }
    });
  } else {
    body = Bodies.circle(x, y, 15, {
      restitution: 0.7,
      friction: 0,
      density: 0.001,
      render: {
        fillStyle: liquidTypes[type] || '#000'
      }
    });
  }

  World.add(world, body);
}

// Mouse drag
const mouse = Mouse.create(canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: { stiffness: 0.2, render: { visible: false } }
});
World.add(world, mouseConstraint);

// Mug container
const mugX = canvas.width / 2;
const mugY = canvas.height - 250;
const mugWidth = 500;
const mugHeight = 350;
const wallThickness = 15;

const mugBottom = Bodies.rectangle(mugX, mugY, mugWidth, wallThickness, { isStatic: true });
const mugLeft = Bodies.rectangle(mugX - mugWidth / 2 + wallThickness / 2, mugY - mugHeight / 2, wallThickness, mugHeight, { isStatic: true });
const mugRight = Bodies.rectangle(mugX + mugWidth / 2 - wallThickness / 2, mugY - mugHeight / 2, wallThickness, mugHeight, { isStatic: true });

World.add(world, [mugBottom, mugLeft, mugRight]);

// Click Sounds(next page)
const nextSound = new Audio('next.wav');

// Get the image element
const nextStepBtn = document.getElementById('nextStepBtn');

// Play sound on click
nextStepBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent instant navigation

  nextSound.currentTime = 0;
  nextSound.play();

  // Navigate after short delay (e.g. 300ms)
  setTimeout(() => {
    window.location.href = '/Assignment2/dough/index.html';
  }, 300);
});


