    document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("recipes-container");
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  
    const searchQuery = localStorage.getItem("searchQuery");
    let filteredRecipes = recipes;
  
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredRecipes = recipes.filter(recipe => {
        const nameMatch = recipe.name.toLowerCase().includes(query);
        const typeMatch = recipe.type.toLowerCase().includes(query);
  
        
        const ingredientsMatch = Array.isArray(recipe.ingredients)
          ? recipe.ingredients.some(ing => ing.includes(query))
          : recipe.ingredients.toLowerCase().includes(query);
  
        return nameMatch || typeMatch || ingredientsMatch;
      });
  
      localStorage.removeItem("searchQuery");
    }
  
    if (filteredRecipes.length === 0) {
      container.innerHTML = "<p>No recipes found matching your search.</p>";
      return;
    }
  
    const categorizedRecipes = filteredRecipes.reduce((acc, recipe) => {
      if (!acc[recipe.type]) {
        acc[recipe.type] = [];
      }
      acc[recipe.type].push(recipe);
      return acc;
    }, {});
  
    for (const type in categorizedRecipes) {
      
      const typeSection = document.createElement("div");
      typeSection.className = "recipe-type-section";
      typeSection.id = `section-${type.toLowerCase()}`; 

  
      const typeTitle = document.createElement("h2");
      typeTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      typeSection.appendChild(typeTitle);
  
      const typeContainer = document.createElement("div");
      typeContainer.className = "recipe-type-container";
  
      categorizedRecipes[type].forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        recipeCard.innerHTML = `
          <h3>${recipe.name}</h3>
          <img src="${recipe.image}" alt="${recipe.name}">
        `;
  
        recipeCard.addEventListener("click", function () {
          localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
          window.location.href = "recipe-details.html";
        });
  
        typeContainer.appendChild(recipeCard);
      });
  
      typeSection.appendChild(typeContainer);
      container.appendChild(typeSection);
    }
  });
  window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
    

  


