document.addEventListener("DOMContentLoaded", function () {
  const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));
  const container = document.getElementById("recipe-detail-container");
  const actionButtons = document.getElementById("action-buttons");

  if (!recipe) {
    container.innerHTML = "<p>No recipe found. Go back and select a recipe!</p>";
    return;
  }

  
  function toUnorderedList(data) {
    let items = [];

    if (Array.isArray(data)) {
      items = data;
    } else if (typeof data === "string") {
      items = data.split(/\r?\n|,/); 
    }

    return `
      <ul style="list-style-type: disc; padding-left: 20px;">
        ${items
          .filter(item => item.trim() !== "")
          .map(item => `<li style="margin-bottom: 10px;">${item.trim()}</li>`)
          .join("")}
      </ul>
    `;
  }

  container.innerHTML = `
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="${recipe.name}" style="width: 400px; height: auto;">
    <p><strong>Type:</strong> ${recipe.type}</p>
    <p><strong>Preparation Time:</strong> ${recipe.prepTime} minutes</p>
    
    <p><strong>Ingredients:</strong></p>
    ${toUnorderedList(recipe.ingredients)}

    <p><strong>Instructions:</strong></p>
    ${toUnorderedList(recipe.instructions)}
  `;


  const currentUser = localStorage.getItem("currentUser");
  const accountType = localStorage.getItem("accountType");

  if (accountType === "true") {
    actionButtons.innerHTML = `
      <button onclick="editRecipe()">Edit</button>
      <button onclick="deleteRecipe()">Delete</button>
    `;
  } else {
    actionButtons.innerHTML = `
      <button onclick="addToFavorites()">Add to Favorites</button>
    `;
  }

  window.editRecipe = function () {
    window.location.href = "edit_recipe.html";
  };

  window.deleteRecipe = function () {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = recipes.filter(r => r.name !== recipe.name);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    const messageBox = document.getElementById("message-box3");
      messageBox.innerText = "recipe deleted successfully!";
      messageBox.style.display = "block";
      setTimeout(() => {
      messageBox.style.display = "none";
     location.reload();}, 7000);
    window.location.href = "recipes.html";
  };

  window.addToFavorites = function () {
    const favoritesKey = "favorites_" + currentUser;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    const alreadyExists = favorites.some(fav => fav.name === recipe.name);

    if (alreadyExists) {
      const messageBox = document.getElementById("message-box2");
      messageBox.innerText = "This recipe is already exists in your favorites.";
      messageBox.style.display = "block";
      setTimeout(() => {
      messageBox.style.display = "none";
     location.reload();}, 2500);
      return;
    }

    favorites.push(recipe);
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    const messageBox1 = document.getElementById("message-box1");
    messageBox1.innerText = "Recipe added to favorites.";
    messageBox1.style.display = "block";
    setTimeout(() => {
    messageBox1.style.display = "none";
    location.reload();}, 2500);
  
  };
});
