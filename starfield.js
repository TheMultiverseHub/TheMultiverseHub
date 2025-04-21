const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
const toggleBtn = document.getElementById('starModeToggle');

let stars = [];
let modeIndex = 0;
const modes = ['classic', 'colorful', 'slow', 'warp']; // Available modes

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width,
      color: getRandomColor()
    });
  }
}

function getRandomColor() {
  const colors = ['#ffffff', '#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0000', '#00aaff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawStars() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    let speed, size;

    switch (modes[modeIndex]) {
      case 'slow':
        star.z -= 0.3;
        size = (1 - star.z / canvas.width) * 1;
        break;
      case 'warp':
        star.z -= 6;
        size = (1 - star.z / canvas.width) * 3;
        break;
      case 'colorful':
        star.z -= 2;
        size = (1 - star.z / canvas.width) * 2;
        break;
      default: // classic
        star.z -= 2;
        size = (1 - star.z / canvas.width) * 2;
        break;
    }

    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = (Math.random() - 0.5) * canvas.width;
      star.y = (Math.random() - 0.5) * canvas.height;
      star.color = getRandomColor();
    }

    let k = 128.0 / star.z;
    let px = canvas.width / 2 + star.x * k;
    let py = canvas.height / 2 + star.y * k;

    if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
      ctx.beginPath();
      ctx.fillStyle = (modes[modeIndex] === 'colorful') ? star.color : '#fff';
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

createStars(300);
animate();

// Toggle starfield mode
toggleBtn.addEventListener('click', () => {
  modeIndex = (modeIndex + 1) % modes.length;
});