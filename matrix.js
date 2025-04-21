const matrixCanvas = document.getElementById('matrix');
const ctxMatrix = matrixCanvas.getContext('2d');

matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const characters = '01';
const fontSize = 16;
const columns = Math.floor(matrixCanvas.width / fontSize);
const drops = Array(columns).fill(1);

// Random RGB highlight generator
function getColor() {
  const roll = Math.random();
  if (roll < 0.02) return '#ff0000'; // red
  if (roll < 0.04) return '#00ff00'; // green
  if (roll < 0.06) return '#0000ff'; // blue
  return '#888'; // default grey
}

function drawMatrix() {
  ctxMatrix.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctxMatrix.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  ctxMatrix.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = characters[Math.floor(Math.random() * characters.length)];
    ctxMatrix.fillStyle = getColor();
    ctxMatrix.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 33); // ~30 FPS

window.addEventListener('resize', () => {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
});