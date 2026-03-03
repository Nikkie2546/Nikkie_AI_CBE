// script.js

// ================== INITIALIZING SCREEN ==================
const initScreen = document.getElementById('init-screen');
const panel = document.getElementById('panel');

window.addEventListener('load', () => {
  // Show matrix animation for 3 seconds
  let initText = document.getElementById('init-text');
  let dots = '';
  const dotInterval = setInterval(() => {
    dots += '.';
    if (dots.length > 3) dots = '';
    initText.textContent = `Initializing Nikkie AI CBE${dots}`;
  }, 500);

  // Remove init screen after 3 seconds
  setTimeout(() => {
    clearInterval(dotInterval);
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

// Create a theme toggle button
const themeButton = document.createElement('button');
themeButton.textContent = 'Toggle Dark/Light Theme';
themeButton.style.display = 'block';
themeButton.style.margin = '10px 0';
themeButton.onclick = () => {
  body.classList.toggle('light');
};

document.getElementById('panel').prepend(themeButton);
