const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

const options = [
  "Order Pizza 🍕",
  "Watch a Comedy 🎭",
  "Take a Walk 🚶‍♂️",
  "Call a Friend 📞",
  "Read a Book 📚",
  "Drink Water 💧",
  "Dance 💃",
  "Nap 😴"
];

const colors = [
  "#f44336", "#e91e63", "#9c27b0", "#3f51b5",
  "#2196f3", "#009688", "#4caf50", "#ff9800"
];

let startAngle = 0;
const arc = Math.PI * 2 / options.length;
let spinAngle = 0;
let spinTimeout = null;
let isSpinning = false;

function drawWheel() {
  for (let i = 0; i < options.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 200, angle, angle + arc, false);
    ctx.lineTo(250, 250);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = "white";
    ctx.translate(250 + Math.cos(angle + arc / 2) * 150,
                  250 + Math.sin(angle + arc / 2) * 150);
    ctx.rotate(angle + arc / 2);
    ctx.fillText(options[i], -30, 0);
    ctx.restore();
  }

  // Draw pointer
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(250 - 10, 250 - 210);
  ctx.lineTo(250 + 10, 250 - 210);
  ctx.lineTo(250, 250 - 230);
  ctx.fill();
}

function rotateWheel() {
  spinAngle += Math.random() * 20 + 10;
  startAngle += spinAngle * Math.PI / 180;
  drawWheel();

  spinTimeout = requestAnimationFrame(rotateWheel);

  if (spinAngle > 0) {
    spinAngle *= 0.97; // Slow down
    if (spinAngle < 0.5) {
      cancelAnimationFrame(spinTimeout);
      spinAngle = 0;
      isSpinning = false;
      const selected = options[getSelectedIndex()];
      resultDiv.textContent = `🎉 You got: ${selected}`;
    }
  }
}

function getSelectedIndex() {
  const degrees = startAngle * 180 / Math.PI + 90;
  const normalized = (360 - (degrees % 360)) % 360;
  return Math.floor(normalized / (360 / options.length));
}

spinBtn.addEventListener('click', () => {
  if (!isSpinning) {
    resultDiv.textContent = '';
    isSpinning = true;
    spinAngle = Math.random() * 100 + 500;
    rotateWheel();
  }
});

drawWheel();
