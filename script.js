// ================== INITIALIZING SCREEN WITH MATRIX EFFECT ==================
const initScreen = document.getElementById('init-screen');
const panel = document.getElementById('panel');

window.addEventListener('load', () => {
  // Create canvas for Matrix effect
  const canvas = document.createElement('canvas');
  initScreen.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = 200; // Only top area for init screen
  const columns = Math.floor(canvas.width / 20);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = '16px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillText(text, i * 20, drops[i] * 20);

      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  const matrixInterval = setInterval(drawMatrix, 50);

  // Animate dots in initializing text
  const initText = document.getElementById('init-text');
  let dots = '';
  const dotInterval = setInterval(() => {
    dots += '.';
    if (dots.length > 3) dots = '';
    initText.textContent = `Initializing Nikkie AI CBE${dots}`;
  }, 500);

  // Remove init screen after 3 seconds
  setTimeout(() => {
    clearInterval(dotInterval);
    clearInterval(matrixInterval);
    initScreen.style.display = 'none';
    panel.style.display = 'block';
  }, 3000);
});

// ================== SUBJECT TOGGLE ==================
function showSection(sectionId) {
  const sections = document.querySelectorAll('.subject-section');
  sections.forEach(section => section.style.display = 'none');

  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';
}

// ================== DARK / LIGHT THEME ==================
const body = document.body;

// Create theme toggle button
const themeButton = document.createElement('button');
themeButton.textContent = 'Toggle Dark/Light Theme';
themeButton.style.display = 'block';
themeButton.style.margin = '10px 0';
themeButton.onclick = () => {
  body.classList.toggle('light');
};

// Add button at the top of the panel
document.getElementById('panel').prepend(themeButton);
