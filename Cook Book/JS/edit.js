document.addEventListener("DOMContentLoaded", function () {
    const recipe = JSON.parse(localStorage.getItem("selectedRecipe"));
    if (!recipe) {
        alert("No recipe data found!");
        return;
    }

    document.getElementById("recipe-name").value = recipe.name;
    document.getElementById("recipe-type").value = recipe.type;
    document.getElementById("prep-time").value = recipe.prepTime;
    document.getElementById("ingredients").value = recipe.ingredients;
    document.getElementById("instructions").value = recipe.instructions;

    const form = document.querySelector(".recipe-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
const name = document.getElementById("recipe-name").value;
        const type = document.getElementById("recipe-type").value;
        const prepTime = document.getElementById("prep-time").value;
        const ingredients = document.getElementById("ingredients").value;
        const instructions = document.getElementById("instructions").value;
        const imageInput = document.getElementById("recipe-image");
        const updateRecipeInStorage = (finalImage) => {
            const updatedRecipe = {
                name,
                type,
                prepTime,
                ingredients,
                instructions,
                image: finalImage
            };
const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
            const index = recipes.findIndex(r => r.name === recipe.name);
            if (index !== -1) {
                recipes[index] = updatedRecipe;
                localStorage.setItem("recipes", JSON.stringify(recipes));
                localStorage.setItem("selectedRecipe", JSON.stringify(updatedRecipe));

                window.location.href = "recipes.html";
            }

        };
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function () {
                const imageBase64 = reader.result;
                updateRecipeInStorage(imageBase64);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {

            updateRecipeInStorage(recipe.image);
        }
    });
});
