// Sample recipes data (immutable)
const recipes = [
  { name: "Pasta", difficulty: "Easy", time: 20 },
  { name: "Biryani", difficulty: "Hard", time: 90 },
  { name: "Salad", difficulty: "Easy", time: 10 },
  { name: "Cake", difficulty: "Medium", time: 60 },
];

// State for filter + sort
let currentFilter = "ALL";
let currentSort = null;

// Pure filter functions
const filters = {
  ALL: (list) => list,
  EASY: (list) => list.filter(r => r.difficulty === "Easy"),
  MEDIUM: (list) => list.filter(r => r.difficulty === "Medium"),
  HARD: (list) => list.filter(r => r.difficulty === "Hard"),
  QUICK: (list) => list.filter(r => r.time < 30),
};

// Pure sort functions
const sorts = {
  NAME: (list) => [...list].sort((a, b) => a.name.localeCompare(b.name)),
  TIME: (list) => [...list].sort((a, b) => a.time - b.time),
};

// Central update function
function updateDisplay() {
  let result = filters[currentFilter](recipes);
  if (currentSort) {
    result = sorts[currentSort](result);
  }
  render(result);
}

// Render function (example DOM update)
function render(list) {
  const container = document.getElementById("recipe-list");
  container.innerHTML = list.map(r => 
    `<li>${r.name} - ${r.difficulty} (${r.time} mins)</li>`
  ).join("");
}

// Event listeners for filter buttons
document.getElementById("filter-all").addEventListener("click", () => {
  currentFilter = "ALL"; updateDisplay();
});
document.getElementById("filter-easy").addEventListener("click", () => {
  currentFilter = "EASY"; updateDisplay();
});
document.getElementById("filter-medium").addEventListener("click", () => {
  currentFilter = "MEDIUM"; updateDisplay();
});
document.getElementById("filter-hard").addEventListener("click", () => {
  currentFilter = "HARD"; updateDisplay();
});
document.getElementById("filter-quick").addEventListener("click", () => {
  currentFilter = "QUICK"; updateDisplay();
});

// Event listeners for sort buttons
document.getElementById("sort-name").addEventListener("click", () => {
  currentSort = "NAME"; updateDisplay();
});
document.getElementById("sort-time").addEventListener("click", () => {
  currentSort = "TIME"; updateDisplay();
});

// Initial load
updateDisplay();