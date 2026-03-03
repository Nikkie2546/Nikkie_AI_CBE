// List of subjects (IDs from index.html)
const subjects = [
  "mathematics",
  "business_studies",
  "geography",
  "history_citizenship",
  "sports_science",
  "visual_arts",
  "performing_arts"
];

// Function to show a specific subject section
function showSubject(subjectId) {
  subjects.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = (id === subjectId) ? "block" : "none";
    }
  });
}

// Example: create buttons dynamically in a panel (if you have a panel div)
const panel = document.getElementById("panel");
if (panel) {
  const btnContainer = document.createElement("div");
  btnContainer.style.marginBottom = "20px";

  subjects.forEach(id => {
    const btn = document.createElement("button");
    btn.textContent = id.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    btn.onclick = () => showSubject(id);
    btnContainer.appendChild(btn);
  });

  panel.prepend(btnContainer); // Adds buttons to the top of the panel
}

// Optional: Save student notes per subject
function saveNote(subjectId) {
  const textarea = document.getElementById(subjectId + "_note");
  if (textarea) {
    localStorage.setItem(subjectId + "_note", textarea.value);
    alert("Note saved for " + subjectId.replace(/_/g, " "));
  }
}

// Optional: Load saved notes per subject on page load
window.addEventListener("load", () => {
  subjects.forEach(id => {
    const textarea = document.getElementById(id + "_note");
    if (textarea) {
      const saved = localStorage.getItem(id + "_note");
      if (saved) textarea.value = saved;
    }
  });
});
