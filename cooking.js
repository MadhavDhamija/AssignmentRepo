// Inside your IIFE
(function() {
  const searchInput = document.getElementById("searchBar");
  let debounceTimer;

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = searchInput.value.toLowerCase();
      filterRecipes(query);
    }, 300); // 300ms debounce
  });

  function filterRecipes(query) {
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
    );
    renderRecipes(filtered);
  }
})();
(function() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(fav => fav !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderRecipes(recipes); // re-render to update heart icon
  }

  function renderRecipes(list) {
    const container = document.getElementById("recipeContainer");
    container.innerHTML = "";
    list.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <button class="favorite-btn">
          ${favorites.includes(recipe.id) ? "❤️" : "🤍"}
        </button>
      `;
      card.querySelector(".favorite-btn").addEventListener("click", () => toggleFavorite(recipe.id));
      container.appendChild(card);
    });
    updateCounter(list.length, recipes.length);
  }
})();
(function() {
  const favFilterBtn = document.getElementById("favFilter");

  favFilterBtn.addEventListener("click", () => {
    const favRecipes = recipes.filter(r => favorites.includes(r.id));
    renderRecipes(favRecipes);
  });
})();
(function() {
  function updateCounter(shown, total) {
    const counter = document.getElementById("recipeCounter");
    counter.textContent = `Showing ${shown} of ${total} recipes`;
  }
})();

