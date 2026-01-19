const recipes = [
  {
    name: "Pasta",
    difficulty: "Easy",
    time: 20,
    ingredients: ["Pasta", "Olive oil", "Garlic", "Tomato sauce"],
    steps: [
      "Boil water",
      { step: "Cook pasta", substeps: ["Add salt", "Stir occasionally"] },
      "Drain and mix with sauce"
    ]
  },
  {
    name: "Biryani",
    difficulty: "Hard",
    time: 90,
    ingredients: ["Rice", "Chicken", "Spices", "Onions"],
    steps: [
      "Marinate chicken",
      { step: "Prepare rice", substeps: [
        "Wash rice",
        "Boil with spices",
        { step: "Drain rice", substeps: ["Keep aside", "Cover with lid"] }
      ]},
      "Layer rice and chicken",
      "Cook on low flame"
    ]
  }
];
function renderSteps(steps) {
  let html = "<ul>";
  steps.forEach(s => {
    if (typeof s === "string") {
      html += `<li>${s}</li>`;
    } else {
      html += `<li>${s.step}`;
      if (s.substeps) {
        html += renderSteps(s.substeps); // recursion here
      }
      html += "</li>";
    }
  });
  html += "</ul>";
  return html;
}
const RecipeApp = (function() {
  // Private variables
  const container = document.getElementById("recipe-list");

  // Private render function
  function render(recipes) {
    container.innerHTML = recipes.map((r, idx) => `
      <div class="recipe-card" data-index="${idx}">
        <h3>${r.name} - ${r.difficulty} (${r.time} mins)</h3>
        <button class="toggle-steps">Show Steps</button>
        <button class="toggle-ingredients">Show Ingredients</button>
        <div class="steps hidden"></div>
        <div class="ingredients hidden"></div>
      </div>
    `).join("");
  }

  // Event delegation
  function handleEvents(recipes) {
    container.addEventListener("click", e => {
      const card = e.target.closest(".recipe-card");
      if (!card) return;
      const idx = card.dataset.index;
      const recipe = recipes[idx];

      if (e.target.classList.contains("toggle-steps")) {
        const stepsDiv = card.querySelector(".steps");
        stepsDiv.innerHTML = renderSteps(recipe.steps);
        stepsDiv.classList.toggle("hidden");
      }

      if (e.target.classList.contains("toggle-ingredients")) {
        const ingDiv = card.querySelector(".ingredients");
        ingDiv.innerHTML = `<ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>`;
        ingDiv.classList.toggle("hidden");
      }
    });
  }

  // Public init
  function init() {
    render(recipes);
    handleEvents(recipes);
  }

  return { init }; // expose only init
})();
document.addEventListener("DOMContentLoaded", () => {
  RecipeApp.init();
});

