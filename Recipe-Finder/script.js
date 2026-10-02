const recipeGrid = document.getElementById("recipe-grid");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const emptyState = document.getElementById("empty-state");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const cuisineFilter = document.getElementById("cuisine-filter");
const difficultyFilter = document.getElementById("difficulty-filter");

const recipeCount = document.getElementById("recipe-count");
const sectionTitle = document.getElementById("section-title");

const resetButton = document.getElementById("reset-filter-button");

const favoriteButton = document.getElementById("favorite-button");
const favoriteCount = document.getElementById("favorite-count");

const recipeDialog = document.getElementById("recipe-dialog");
const dialogContent = document.getElementById("dialog-content");
const closeDialog = document.getElementById("close-dialog");

let recipes = [];
let filteredRecipes = [];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


// =========================
// AMBIL DATA DARI API
// =========================

async function getRecipes() {
  try {
    const response = await fetch("https://dummyjson.com/recipes?limit=0");

    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }

    const data = await response.json();

    recipes = data.recipes;
    filteredRecipes = recipes;

    loadingState.hidden = true;
    recipeGrid.hidden = false;

    createCuisineFilter();
    showRecipes();
    updateFavoriteCount();

  } catch (error) {
    loadingState.hidden = true;
    errorState.hidden = false;

    console.log(error);
  }
}


// =========================
// TAMPILKAN RECIPE
// =========================

function showRecipes() {
  recipeGrid.innerHTML = "";

  if (filteredRecipes.length === 0) {
    recipeGrid.hidden = true;
    emptyState.hidden = false;
    recipeCount.textContent = "0 recipes";
    return;
  }

  recipeGrid.hidden = false;
  emptyState.hidden = true;

  filteredRecipes.forEach(function(recipe) {
    const card = document.createElement("div");

    const isFavorite = favorites.includes(recipe.id);

    card.className = "recipe-card";

    card.innerHTML = `
      <img 
        src="${recipe.image}" 
        alt="${recipe.name}" 
        class="recipe-image"
      >

      <div class="recipe-body">

        <span class="recipe-cuisine">
          ${recipe.cuisine}
        </span>

        <h3 class="recipe-title">
          ${recipe.name}
        </h3>

        <div class="recipe-meta">
          <span>⭐ ${recipe.rating}</span>
          <span>⏱️ ${recipe.cookTimeMinutes} min</span>
          <span>👥 ${recipe.servings}</span>
        </div>

        <div class="recipe-actions">

          <button 
            class="detail-button"
            onclick="showDetail(${recipe.id})"
          >
            Lihat Detail
          </button>

          <button
            class="like-button"
            onclick="toggleFavorite(${recipe.id})"
            title="Favorite"
          >
            ${isFavorite ? "❤️" : "🤍"}
          </button>

        </div>

      </div>
    `;

    recipeGrid.appendChild(card);
  });

  recipeCount.textContent = `${filteredRecipes.length} recipes`;

  updateResetButton();
}


// =========================
// FILTER CUISINE
// =========================

function createCuisineFilter() {
  const cuisines = [];

  recipes.forEach(function(recipe) {
    if (!cuisines.includes(recipe.cuisine)) {
      cuisines.push(recipe.cuisine);
    }
  });

  cuisines.sort();

  cuisines.forEach(function(cuisine) {
    const option = document.createElement("option");

    option.value = cuisine;
    option.textContent = cuisine;

    cuisineFilter.appendChild(option);
  });
}


// =========================
// SEARCH
// =========================

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  filterRecipes();
});


// =========================
// FILTER
// =========================

cuisineFilter.addEventListener("change", function() {
  filterRecipes();
});

difficultyFilter.addEventListener("change", function() {
  filterRecipes();
});


function filterRecipes() {
  const keyword = searchInput.value.toLowerCase().trim();
  const cuisine = cuisineFilter.value;
  const difficulty = difficultyFilter.value;

  filteredRecipes = recipes.filter(function(recipe) {

    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(keyword);

    const matchesCuisine =
      cuisine === "" || recipe.cuisine === cuisine;

    const matchesDifficulty =
      difficulty === "" || recipe.difficulty === difficulty;

    return matchesSearch && matchesCuisine && matchesDifficulty;
  });

  showRecipes();

  sectionTitle.textContent =
    keyword || cuisine || difficulty
      ? "Search Results"
      : "Explore Recipes";
}


// =========================
// RESET
// =========================

resetButton.addEventListener("click", function() {
  searchInput.value = "";
  cuisineFilter.value = "";
  difficultyFilter.value = "";

  filteredRecipes = recipes;

  sectionTitle.textContent = "Explore Recipes";

  showRecipes();
});


function updateResetButton() {
  const hasFilter =
    searchInput.value !== "" ||
    cuisineFilter.value !== "" ||
    difficultyFilter.value !== "";

  resetButton.hidden = !hasFilter;
}


// =========================
// DETAIL RECIPE
// =========================

function showDetail(id) {
  const recipe = recipes.find(function(item) {
    return item.id === id;
  });

  if (!recipe) {
    return;
  }

  dialogContent.innerHTML = `
    <img 
      src="${recipe.image}" 
      alt="${recipe.name}"
      class="dialog-image"
    >

    <div class="dialog-body">

      <h2>${recipe.name}</h2>

      <div class="dialog-meta">
        <span>🍴 ${recipe.cuisine}</span>
        <span>⭐ ${recipe.rating}</span>
        <span>⏱️ ${recipe.cookTimeMinutes} menit</span>
        <span>👥 ${recipe.servings} porsi</span>
        <span>📊 ${recipe.difficulty}</span>
      </div>

      <h3>Ingredients</h3>

      <ul class="ingredients">
        ${recipe.ingredients.map(function(item) {
          return `<li>${item}</li>`;
        }).join("")}
      </ul>

      <h3>Instructions</h3>

      <div class="instructions">
        ${recipe.instructions.map(function(step, index) {
          return `<p>${index + 1}. ${step}</p>`;
        }).join("")}
      </div>

    </div>
  `;

  recipeDialog.showModal();
}


// =========================
// TUTUP DETAIL
// =========================

closeDialog.addEventListener("click", function() {
  recipeDialog.close();
});


// =========================
// FAVORITE
// =========================

function toggleFavorite(id) {
  if (favorites.includes(id)) {

    favorites = favorites.filter(function(item) {
      return item !== id;
    });

  } else {

    favorites.push(id);

  }

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  updateFavoriteCount();
  showRecipes();
}


// =========================
// JUMLAH FAVORITE
// =========================

function updateFavoriteCount() {
  favoriteCount.textContent = favorites.length;
}


// =========================
// TOMBOL FAVORITE
// =========================

favoriteButton.addEventListener("click", function() {

  if (favorites.length === 0) {
    alert("Belum ada recipe favorite.");
    return;
  }

  filteredRecipes = recipes.filter(function(recipe) {
    return favorites.includes(recipe.id);
  });

  sectionTitle.textContent = "My Favorites";

  showRecipes();
});


// =========================
// JALANKAN PROGRAM
// =========================

getRecipes();