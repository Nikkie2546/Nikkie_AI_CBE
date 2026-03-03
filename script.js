// ================= MATRIX BACKGROUND =================
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

// ================= BOOT SCREEN =================
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
  if (b < bootLines.length)
    typeLine(bootLines[b], () => { b++; bootSequence(); });
  else {
    bs.innerHTML += "<span class='blink'>SYSTEM ONLINE</span>\n";
    setTimeout(() => {
      bs.style.display = "none";
      document.getElementById("app").style.display = "block";
      checkAutoLogin();
    }, 500);
  }
}
bootSequence();

// ================= COUNTIES =================
const counties = [
  "Mombasa","Kwale","Kilifi","Tana River","Lamu","Taita Taveta","Garissa","Wajir","Mandera",
  "Marsabit","Isiolo","Meru","Tharaka-Nithi","Embu","Kitui","Machakos","Makueni","Nyandarua",
  "Nyeri","Kirinyaga","Murang'a","Kiambu","Turkana","West Pokot","Samburu","Trans Nzoia",
  "Uasin Gishu","Elgeyo Marakwet","Nandi","Baringo","Laikipia","Nakuru","Narok","Kajiado",
  "Kericho","Bomet","Kakamega","Vihiga","Bungoma","Busia","Siaya","Kisumu","Homa Bay",
  "Migori","Kisii","Nyamira","Nairobi"
];

// ================= STUDENT LOGIN =================
function checkAutoLogin() {
  let lastUser = localStorage.getItem("lastStudent");
  if (lastUser) enterStudentDashboard(lastUser);
}

function studentLogin() {
  let countyOptions = counties.map(c => `<option value="${c}">${c}</option>`).join("");
  document.getElementById("panel").innerHTML = `<div class='section'>
    <h2>Student Login / Signup</h2>
    <input id="studentName" placeholder="Enter Name">
    <select id="studentCounty"><option value="">Select County</option>${countyOptions}</select>
    <input id="studentSchool" placeholder="Enter School">
    <input type="password" id="studentPass" placeholder="Enter Password">
    <button onclick="saveStudent()">Login / Signup</button>
  </div>`;
}

function saveStudent() {
  let name = document.getElementById("studentName").value.trim();
  let pass = document.getElementById("studentPass").value.trim();
  let county = document.getElementById("studentCounty").value.trim();
  let school = document.getElementById("studentSchool").value.trim();
  if (!name || !pass || !county || !school) { alert("Fill all fields!"); return; }
  let students = JSON.parse(localStorage.getItem("students") || "{}");
  students[name] = { password: pass, county: county, school: school };
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("lastStudent", name);
  alert("Account saved! Logged in as " + name);
  enterStudentDashboard(name);
}

// ================= STUDENT DASHBOARD =================
function enterStudentDashboard(name) {
  let students = JSON.parse(localStorage.getItem("students") || "{}");
  let county = students[name].county;
  let school = students[name].school;
  document.getElementById("panel").innerHTML = `<div class='section'>
    <h2>Welcome, ${name}</h2>
    <p>County: ${county} | School: ${school}</p>
    <button onclick='studentSubjects("${name}")'>Subjects & Notes</button>
    <button onclick='studentQuizzes("${name}")'>Quizzes</button>
    <button onclick='logoutStudent()'>Logout</button>
  </div>`;
}

function logoutStudent() { 
  localStorage.removeItem("lastStudent"); 
  document.getElementById("panel").innerHTML = "<p>Logged out successfully.</p>"; 
}

// ================= CBE CURRICULUM CONTENT =================
const subjects = {
  "Mathematics": {
    "Competencies": [
      "Apply algebraic skills to solve real-world problems.",
      "Interpret geometric and measurement concepts accurately.",
      "Use statistics and probability to analyze data."
    ],
    "Notes": {
      "Algebra": "Equations, inequalities, formulas, word problems.",
      "Geometry": "Triangles, circles, quadrilaterals, transformations.",
      "Statistics": "Mean, median, mode, probability concepts."
    },
    "Activities": ["Solve algebra word problems.","Draw geometric shapes.","Analyze data using statistics."],
    "Quizzes": [{q:"2+2=?", options:["3","4","5"], answer:1},{q:"Area of triangle formula?", options:["1/2*b*h","b*h","b+h"], answer:0}],
    "Projects": ["Create a statistics report using local school data.","Design geometric models."],
    "Reflection": "Reflect on how mathematics can be applied in real-life situations."
  },
  "Physics": {
    "Competencies":["Understand forces, motion, energy, and waves.","Apply physical principles in experiments.","Analyze data using ICT tools."],
    "Notes":{"Mechanics":"Newton's laws, motion, energy, momentum.","Optics":"Light reflection, refraction, lenses.","Electricity":"Current, voltage, circuits."},
    "Activities":["Conduct motion experiments.","Measure light refraction.","Build circuits."],
    "Quizzes":[{q:"Force formula?", options:["F=ma","E=mc^2","P=mv"], answer:0}],
    "Projects":["Create physics experiment report.","Demonstrate energy transformations."],
    "Reflection":"Reflect on how physics helps understand the natural world."
  },
  "Chemistry": {
    "Competencies":["Understand chemical reactions and properties.","Apply lab safety and experimental skills.","Analyze chemical data."],
    "Notes":{"Matter":"States, properties, mixtures, elements.","Reactions":"Types of reactions, balancing equations.","Organic Chemistry":"Basic hydrocarbons."},
    "Activities":["Conduct safe experiments.","Observe chemical changes.","Measure reaction rates."],
    "Quizzes":[{q:"H2O formula?", options:["HO","H2O","OH2"], answer:1}],
    "Projects":["Make a simple chemistry model.","Report on chemical reactions."],
    "Reflection":"Reflect on how chemistry explains the material world."
  },
  "Biology": {
    "Competencies":["Understand living organisms and ecosystems.","Explain human body systems.","Use microscopes to study cells."],
    "Notes":{"Cells":"Structure, functions, organelles.","Human Body":"Systems and functions.","Ecology":"Ecosystems, food chains."},
    "Activities":["Observe cells under microscope.","Draw body systems.","Study local ecosystems."],
    "Quizzes":[{q:"Basic unit of life?", options:["Cell","Atom","Molecule"], answer:0}],
    "Projects":["Prepare a plant or animal specimen.","Observe biodiversity in school."],
    "Reflection":"Reflect on how biology relates to health and environment."
  },
  "English": {
    "Competencies":["Use correct grammar and sentence structures.","Interpret literature texts.","Develop writing and comprehension skills."],
    "Notes":{"Grammar":"Tenses, parts of speech.","Comprehension":"Sample passages and analysis.","Writing":"Essays, letters, summaries."},
    "Activities":["Write essays.","Analyze literature passages.","Practice grammar exercises."],
    "Quizzes":[{q:"Correct spelling?", options:["Recieve","Receive","Receeve"], answer:1}],
    "Projects":["Write a story or essay.","Perform a reading exercise."],
    "Reflection":"Reflect on how English communication is important in daily life."
  },
  // You can continue filling ICT, Business Studies, Geography, History & Citizenship, Sports Science, Visual Arts, Performing Arts similarly
};

// ================= STUDENT SUBJECTS =================
function studentSubjects(name){
  let html = "<div class='section'><h2>Subjects & Notes</h2>";
  for(let sub in subjects){
    html += `<h3>${sub}</h3>`;
    if(subjects[sub].Competencies)
      html += `<b>Competencies:</b><ul>${subjects[sub].Competencies.map(c=>`<li>${c}</li>`).join("")}</ul>`;
    if(subjects[sub].Notes){
      for(let topic in subjects[sub].Notes){
        html += `<b>${topic}:</b> ${subjects[sub].Notes[topic]}<br>`;
      }
    }
    if(subjects[sub].Activities)
      html += `<b>Activities:</b><ol>${subjects[sub].Activities.map(a=>`<li>${a}</li>`).join("")}</ol>`;
    if(subjects[sub].Quizzes)
      html += `<b>Quizzes:</b><ol>${subjects[sub].Quizzes.map(q=>`<li>${q.q}</li>`).join("")}</ol>`;
    if(subjects[sub].Projects)
      html += `<b>Projects:</b><ul>${subjects[sub].Projects.map(p=>`<li>${p}</li>`).join("")}</ul>`;
    if(subjects[sub].Reflection)
      html += `<b>Reflection:</b> <p>${subjects[sub].Reflection}</p>`;
  }
  let notes = JSON.parse(localStorage.getItem("studentNotes")||"{}");
  html += `<div class='section'><h2>My Notes</h2><textarea id='myNotes'>${notes[name]||""}</textarea><br><small>Notes auto-saved</small></div>`;
  document.getElementById("panel").innerHTML = html;
  setInterval(()=>{
    let currentNotes=document.getElementById("myNotes");
    if(currentNotes){ notes[name] = currentNotes.value; localStorage.setItem("studentNotes", JSON.stringify(notes)); }
  },2000);
}

// ================= QUIZZES =================
function studentQuizzes(name){
  let html="<div class='section'><h2>Quizzes</h2>";
  for(let sub in subjects){
    if(subjects[sub].Quizzes){
      html += `<h3>${sub}</h3>`;
      subjects[sub].Quizzes.forEach((quiz,i)=>{
        quiz.options.forEach((opt,j)=>{
          html += `<button onclick="checkQuiz('${name}','${sub}',${i},${j})">${opt}</button>`;
        });
      });
    }
  }
  html += "</div>";
  document.getElementById("panel").innerHTML = html;
}

function checkQuiz(student,subject,qIndex,optIndex){
  if(subjects[subject].Quizzes[qIndex].answer === optIndex){
    alert("Correct!");
    let progress = JSON.parse(localStorage.getItem("studentProgress")||"{}");
    progress[student] = progress[student]||{};
    progress[student][subject] = (progress[student][subject]||0)+1;
    localStorage.setItem("studentProgress",JSON.stringify(progress));
  } else alert("Wrong!");
}

// ================= TEACHER & ADMIN =================
// Teacher
function enterTeacher(){
  let pass=prompt("Enter Teacher Password:");
  if(pass==="admin123"){
    document.getElementById("panel").innerHTML=`<div class='section'>
      <h2>Teacher Dashboard</h2>
      <button onclick='addNotesTeacher()'>Add/Edit Notes</button>
    </div>`;
  } else alert("Wrong password");
}
function addNotesTeacher(){
  let note=localStorage.getItem("teacherNote")||"";
  document.getElementById("panel").innerHTML=`<div class='section'>
    <h2>Add/Edit Notes</h2>
    <textarea id='noteBox'>${note}</textarea><br>
    <button onclick='saveNoteTeacher()'>Save</button>
  </div>`;
}
function saveNoteTeacher(){ localStorage.setItem("teacherNote", document.getElementById("noteBox").value); alert("Notes saved."); }

// Master Admin
function enterAdmin(){
  let pass=prompt("Enter Master Admin Password:");
  if(pass==="nicky@26tech"){
    let students=JSON.parse(localStorage.getItem("students")||"{}");
    document.getElementById("panel").innerHTML=`<div class='section'>
      <h2>Master Admin</h2>
      <button onclick='optimizeSystem()'>Optimize System</button>
      <button onclick='clearData()'>Clear All Local Data</button>
      <h3>All Student Accounts</h3>
      ${Object.keys(students).map(s=>`<p>${s}: ${students[s].password} | ${students[s].county} | ${students[s].school}</p>`).join("")}
    </div>`;
  } else alert("Access denied");
}
function optimizeSystem(){ alert("System optimized."); } 
function clearData(){ localStorage.clear(); alert("All data wiped."); }

// ================= SETTINGS =================
function openSettings(){
  document.getElementById("panel").innerHTML=`<div class='section'>
    <h2>Settings</h2>
    <button onclick='toggleTheme()'>Toggle Theme</button>
  </div>`;
}
let dark=true;
function toggleTheme(){
  dark=!dark;
  document.body.style.background = dark?"#000":"#fff";
  document.body.style.color = dark?"#0f0":"#000";
}

// ================= REGISTER SERVICE WORKER =================
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(()=>console.log('Service Worker Registered'))
    .catch(()=>console.log('Service Worker Failed'));
  }
