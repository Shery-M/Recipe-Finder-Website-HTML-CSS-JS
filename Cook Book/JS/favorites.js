document.addEventListener("DOMContentLoaded", function () {
    const currentUser = localStorage.getItem("currentUser");
    const favoritesKey = "favorites_" + currentUser;
    const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const validFavorites = favorites.filter(fav => {
        return recipes.some(recipe => recipe.name === fav.name);
    });

    const container = document.getElementById("favorites-container");
    if (validFavorites.length === 0) {
        container.innerHTML = "<p>No valid favorites found. Some recipes might have been deleted.</p>";
        return;
    }

    validFavorites.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";

        
        const image = document.createElement("img");
        image.src = recipe.image;
        image.alt = recipe.name;
        image.className = "recipe-image";
        image.addEventListener("click", function() {
            localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
            window.location.href = "recipe-details.html";
        });

       
        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.innerText = "Remove";
        removeButton.addEventListener("click", function(event) {
            event.stopPropagation(); 
            removeFromFavorites(index);
        });

        recipeCard.appendChild(image);
        recipeCard.appendChild(removeButton);
        container.appendChild(recipeCard);
    });
});



function removeFromFavorites(index) {
  const currentUser = localStorage.getItem("currentUser");
  const favoritesKey = "favorites_" + currentUser;
  const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

  favorites.splice(index, 1);
  localStorage.setItem(favoritesKey, JSON.stringify(favorites));

  const messageBox = document.getElementById("message-box");
  messageBox.innerText = "Recipe removed from favorites.";
  messageBox.style.display = "block";

 
  setTimeout(() => {
    messageBox.style.display = "none";
    location.reload();
}, 2000);
}


