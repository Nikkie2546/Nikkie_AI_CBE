// ================== MATRIX BACKGROUND ==================
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
let columns = Math.floor(window.innerWidth / 20);
const drops = Array(columns).fill(1);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / 20);
  drops.length = columns;
  drops.fill(1);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  ctx.font = "16px Consolas";
  for (let i = 0; i < columns; i++) {
    const text = String.fromCharCode(33 + Math.random() * 94);
    ctx.fillText(text, i * 20, drops[i] * 20);
    if (drops[i] * 20 > canvas.height || Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

// ================== BOOT SCREEN ==================
const bootLines = [
  "Nikkie Learning Platform v13",
  "Loading touch interface...",
  "Initializing CBE modules...",
  "Loading GPU-accelerated UI engine...",
  "Activating smart learning modules...",
  "Encrypting local data...",
  "Boosting animation performance...",
  "System online."
];
let b = 0, bs = document.getElementById("bootScreen");

function typeLine(line, callback) {
  let i = 0;
  function typeChar() {
    bs.innerHTML += line.charAt(i);
    i++;
    if (i < line.length) setTimeout(typeChar, 20);
    else { bs.innerHTML += "\n"; callback(); }
  }
  typeChar();
}

function bootSequence() {
  if (b < bootLines.length) {
    typeLine(bootLines[b], () => { b++; bootSequence(); });
  } else {
    bs.innerHTML += "<span class='blink'>SYSTEM ONLINE</span>\n";
    setTimeout(() => {
      bs.style.display = "none";
      document.getElementById("app").style.display = "block";
      checkAutoLogin();
    }, 500);
  }
}
bootSequence();

// ================== CBE CURRICULUM SUBJECTS ==================
const subjects = {
  Mathematics: {
    Algebra: "Expressions, equations, factorization.",
    Geometry: "Triangles, Circles, Quadrilaterals.",
    Calculus: "Limits, differentiation, integration.",
    Statistics: "Mean, median, mode, probability."
  },
  Physics: {
    Mechanics: "Newton's laws, motion, forces.",
    Optics: "Reflection, refraction, lenses.",
    Electricity: "Current, voltage, circuits.",
    Thermodynamics: "Heat, temperature, energy."
  },
  Chemistry: {
    "Atomic Structure": "Protons, neutrons, electrons, isotopes.",
    "Chemical Reactions": "Balancing, types of reactions, rates.",
    "Organic Chemistry": "Hydrocarbons, functional groups.",
    "Analytical Chemistry": "Titrations, qualitative tests."
  },
  Biology: {
    "Cell Biology": "Structure, organelles, cell division.",
    "Human Biology": "Digestive, respiratory, circulatory systems.",
    Ecology: "Ecosystems, food chains, conservation.",
    Genetics: "Inheritance, DNA, mutations."
  },
  English: {
    Grammar: "Tenses, parts of speech, punctuation.",
    Comprehension: "Passages, analysis, summaries.",
    Literature: "Short stories, novels, poems, plays.",
    Writing: "Essays, letters, reports."
  },
  ICT: {
    HTML: "Tags, forms, tables, links.",
    CSS: "Selectors, properties, styling.",
    JavaScript: "Variables, loops, functions, DOM manipulation.",
    Spreadsheets: "Formulas, charts, data analysis."
  },
  "Business Studies": {
    "Business Environment": "Types of businesses, stakeholders, markets.",
    Entrepreneurship: "Business ideas, planning, risk management.",
    "Financial Literacy": "Budgeting, savings, investment.",
    Marketing: "4 Ps, customer service, strategies.",
    "ICT in Business": "Digital payments, record keeping, online marketing."
  },
  Geography: {
    "Physical Geography": "Landforms, climate, ecosystems.",
    "Human Geography": "Population, settlements, transport, agriculture.",
    Environment: "Pollution, deforestation, conservation.",
    Maps: "Topography, scale, contour lines.",
    "GIS & ICT": "Mapping software, data analysis, presentations."
  },
  "History & Citizenship": {
    History: "Ancient civilizations, colonialism, independence.",
    "Civic Education": "Rights, democracy, governance.",
    Ethics: "Human rights, social justice, decision-making.",
    Sources: "Primary, secondary, oral histories."
  },
  "Sports Science": {
    Fitness: "Exercise types, warm-up, cool-down, components of fitness.",
    Nutrition: "Balanced diet, hydration, injury prevention.",
    Skills: "Techniques, rules, strategies in sports.",
    Analysis: "Performance metrics, improvement tracking."
  },
  "Visual Arts": {
    Drawing: "Techniques, perspective, color theory.",
    Sculpture: "Materials, form, 3D representation.",
    "Art History": "Local and global movements, famous artists.",
    Design: "Balance, proportion, rhythm, emphasis."
  },
  "Performing Arts": {
    Music: "Rhythm, melody, harmony, instruments, composition.",
    Dance: "Styles, movements, coordination, expression.",
    Drama: "Acting, scripts, stage presence, improvisation.",
    Collaboration: "Teamwork, rehearsal, leadership."
  }
};

// ================== STUDENT LOGIN / DASHBOARD ==================
const counties = ["Mombasa","Kwale","Kilifi","Tana River","Lamu","Taita Taveta","Garissa","Wajir","Mandera","Marsabit","Isiolo","Meru","Tharaka-Nithi","Embu","Kitui","Machakos","Makueni","Nyandarua","Nyeri","Kirinyaga","Murang'a","Kiambu","Turkana","West Pokot","Samburu","Trans Nzoia","Uasin Gishu","Elgeyo Marakwet","Nandi","Baringo","Laikipia","Nakuru","Narok","Kajiado","Kericho","Bomet","Kakamega","Vihiga","Bungoma","Busia","Siaya","Kisumu","Homa Bay","Migori","Kisii","Nyamira","Nairobi"];

function checkAutoLogin(){
  let lastUser = localStorage.getItem("lastStudent");
  if(lastUser) enterStudentDashboard(lastUser);
}

function studentLogin(){
  let countyOptions = counties.map(c=>`<option value="${c}">${c}</option>`).join("");
  document.getElementById("panel").innerHTML=`<div class='section'><h2>Student Login / Signup</h2>
    <input id="studentName" placeholder="Enter Name">
    <select id="studentCounty"><option value="">Select County</option>${countyOptions}</select>
    <input id="studentSchool" placeholder="Enter School">
    <input type="password" id="studentPass" placeholder="Enter Password">
    <button onclick="saveStudent()">Login / Signup</button></div>`;
}

function saveStudent(){
  let name=document.getElementById("studentName").value.trim();
  let pass=document.getElementById("studentPass").value.trim();
  let county=document.getElementById("studentCounty").value.trim();
  let school=document.getElementById("studentSchool").value.trim();
  if(!name||!pass||!county||!school){ alert("Fill all fields!"); return; }
  let students=JSON.parse(localStorage.getItem("students")||"{}");
  students[name]={password:pass, county:county, school:school};
  localStorage.setItem("students",JSON.stringify(students));
  localStorage.setItem("lastStudent", name);
  alert("Account saved! Logged in as "+name);
  enterStudentDashboard(name);
}

function enterStudentDashboard(name){
  let students=JSON.parse(localStorage.getItem("students")||"{}");
  let county=students[name].county;
  let school=students[name].school;
  document.getElementById("panel").innerHTML=`<div class='section'><h2>Welcome, ${name}</h2>
    <p>County: ${county} | School: ${school}</p>
    <button onclick='studentSubjects("${name}")'>Subjects & Notes</button>
    <button onclick='studentQuizzes("${name}")'>Quizzes</button>
    <button onclick='viewStudentNotes("${name}")'>My Notes</button>
    <button onclick='logoutStudent()'>Logout</button>
    </div>`;
}

function logoutStudent(){ localStorage.removeItem("lastStudent"); document.getElementById("panel").innerHTML="<p>Logged out successfully.</p>"; }

// ================== STUDENT SUBJECTS & NOTES ==================
function studentSubjects(name){
  let html="<div class='section'><h2>Subjects & Notes</h2>";
  for(let sub in subjects){
    html+=`<h3>${sub}</h3>`;
    for(let topic in subjects[sub]){
      html+=`<b>${topic}:</b> ${subjects[sub][topic]}<br><br>`;
    }
  }
  html+="</div>";

  let notes=JSON.parse(localStorage.getItem("studentNotes")||"{}");
  html+=`<div class='section'><h2>My Notes</h2><textarea id='myNotes'>${notes[name]||""}</textarea><br><small>Notes auto-saved</small></div>`;

  document.getElementById("panel").innerHTML=html;

  setInterval(()=>{
    let currentNotes=document.getElementById("myNotes");
    if(currentNotes){ notes[name]=currentNotes.value; localStorage.setItem("studentNotes",JSON.stringify(notes)); }
  },2000);
}

// ================== QUIZZES ==================
const quizzes={
  Mathematics:[{q:"2+2=?",options:["3","4","5"],answer:1},{q:"5*3=?",options:["15","10","20"],answer:0}],
  Physics:[{q:"Force formula?",options:["F=ma","E=mc^2","P=mv"],answer:0}]
};

function studentQuizzes(name){
  let html="<div class='section'><h2>Quizzes</h2>";
  for(let sub in quizzes){
    html+=`<h3>${sub}</h3>`;
    quizzes[sub].forEach((quiz,i)=>{
      html+=`<p>${quiz.q}</p>`;
      quiz.options.forEach((opt,j)=>{
        html+=`<button onclick="checkQuiz('${name}','${sub}',${i},${j})">${opt}</button>`;
      });
    });
  }
  html+="</div>";
  document.getElementById("panel").innerHTML=html;
}

function checkQuiz(student,subject,qIndex,optIndex){
  if(quizzes[subject][qIndex].answer===optIndex){
    alert("Correct!");
    let progress=JSON.parse(localStorage.getItem("studentProgress")||"{}");
    progress[student]=progress[student]||{};
    progress[student][subject]=(progress[student][subject]||0)+1;
    localStorage.setItem("studentProgress",JSON.stringify(progress));
  } else alert("Wrong!");
}

// ================== TEACHER DASHBOARD ==================
function enterTeacher(){ 
  let pass=prompt("Enter Teacher Password:");
  if(pass==="admin123"){
    document.getElementById("panel").innerHTML=`<div class='section'><h2>Teacher Dashboard</h2>
      <button onclick='addNotesTeacher()'>Add/Edit Notes</button>
      <button onclick='viewStudents()'>View Student Reports</button></div>`;
  } else alert("Wrong password");
}

function addNotesTeacher(){
  let note=localStorage.getItem("teacherNote")||"";
  document.getElementById("panel").innerHTML=`<div class='section'><h2>Add/Edit Notes</h2>
    <textarea id='noteBox'>${note}</textarea><br><button onclick='saveNoteTeacher()'>Save</button></div>`;
}

function saveNoteTeacher(){ 
  localStorage.setItem("teacherNote",document.getElementById("noteBox").value); 
  alert("Notes saved."); 
}

// ================== MASTER ADMIN DASHBOARD ==================
function enterAdmin(){
  let pass=prompt("Enter Master Admin Password:");
  if(pass==="nicky@26tech"){
    let students=JSON.parse(localStorage.getItem("students")||"{}");
    document.getElementById("panel").innerHTML=`<div class='section'><h2>Master Admin</h2>
      <button onclick='optimizeSystem()'>Optimize System</button>
      <button onclick='clearData()'>Clear All Local Data</button>
      <h3>All Student Accounts</h3>
      ${Object.keys(students).map(s=>`<p>${s}: ${students[s].password} | ${students[s].county} | ${students[s].school}</p>`).join("")}
      </div>`;
  } else alert("Access denied");
}

function optimizeSystem(){ alert("System optimized."); } 
function clearData(){ localStorage.clear(); alert("All data wiped."); }

// ================== SETTINGS ==================
function openSettings(){ 
  document.getElementById("panel").innerHTML=`<div class='section'><h2>Settings</h2>
    <button onclick='toggleTheme()'>Toggle Theme</button></div>`;
}

let dark=true;
function toggleTheme(){
  dark=!dark;
  document.body.style.background=dark?"#000":"#fff";
  document.body.style.color=dark?"#0f0":"#000";
}

// ================== REGISTER SERVICE WORKER ==================
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js')
    .then(()=>console.log('Service Worker Registered'))
    .catch(()=>console.log('Service Worker Failed'));
      }
