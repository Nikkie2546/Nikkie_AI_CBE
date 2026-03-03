// ==========================
// MATRIX HACKER BACKGROUND
// ==========================
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%';
const lettersArray = letters.split('');

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ==========================
// THEME TOGGLE
// ==========================
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// ==========================
// SHOW/HIDE SUBJECT SECTIONS
// ==========================
function showSection(sectionId) {
  const sections = document.querySelectorAll('.subject-section');
  sections.forEach(sec => {
    sec.style.display = 'none';
  });

  const selected = document.getElementById(sectionId);
  if (selected) selected.style.display = 'block';
}

// ==========================
// DASHBOARD SAVE FUNCTIONS
// ==========================
function saveStudent() {
  const name = document.getElementById('studentName').value;
  const county = document.getElementById('county').value;
  const school = document.getElementById('school').value;
  alert(`Saved Student Info:\nName: ${name}\nCounty: ${county}\nSchool: ${school}`);
}

function saveTeacher() {
  const name = document.getElementById('teacherName').value;
  alert(`Saved Teacher Info:\nName: ${name}`);
}

function saveAdmin() {
  const name = document.getElementById('adminName').value;
  alert(`Saved Admin Info:\nName: ${name}`);
}
