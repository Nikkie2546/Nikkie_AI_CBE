// ======================
// Theme toggle (optional)
// ======================
let dark = true;
function toggleTheme() {
    dark = !dark;
    document.body.style.background = dark ? "#000" : "#fff";
    document.body.style.color = dark ? "#0f0" : "#000";
}

// ======================
// Show/Hide Subject Sections
// ======================
function showSection(sectionId) {
    // Hide all sections first
    const sections = document.querySelectorAll(".subject-section");
    sections.forEach(sec => sec.style.display = "none");

    // Show the selected section
    const target = document.getElementById(sectionId);
    if(target) target.style.display = "block";
}

// ======================
// Save Notes & Reflections
// ======================
function saveNotes(subjectId) {
    const notes = document.getElementById(subjectId + "_notes");
    const reflection = document.getElementById(subjectId + "_reflection");

    if(notes) localStorage.setItem(subjectId + "_notes", notes.value);
    if(reflection) localStorage.setItem(subjectId + "_reflection", reflection.value);

    alert("Saved successfully!");
}

// ======================
// Load Notes & Reflections on page load
// ======================
function loadNotes() {
    const sections = document.querySelectorAll(".subject-section");
    sections.forEach(sec => {
        const id = sec.id;
        const notes = document.getElementById(id + "_notes");
        const reflection = document.getElementById(id + "_reflection");

        if(notes) notes.value = localStorage.getItem(id + "_notes") || "";
        if(reflection) reflection.value = localStorage.getItem(id + "_reflection") || "";
    });
}

// Run on page load
window.onload = loadNotes;
