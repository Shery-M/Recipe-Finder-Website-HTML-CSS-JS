document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".recipe-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("recipe-name").value.trim();
        const type = document.getElementById("recipe-type").value;
        const prepTime = document.getElementById("prep-time").value;
        const ingredientsInput = document.getElementById("ingredients").value.trim();
        const ingredients = ingredientsInput.split(",").map(item => item.trim().toLowerCase()).filter(item => item); 
        const instructions = document.getElementById("instructions").value.trim();
        const imageInput = document.getElementById("recipe-image");

        
        if (!name || !type || !prepTime || !ingredients || !instructions || !imageInput.files.length) {
            alert("Please fill in all fields.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            const imageBase64 = reader.result;

         //to add recipe
const newRecipe = {
    name,
    type,
    prepTime,
    ingredients,
    instructions,
    image: imageBase64    //instead of store image of recipe we store link 
};

           
            const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

           
            recipes.push(newRecipe);

           
            localStorage.setItem("recipes", JSON.stringify(recipes));

          
            window.location.href = "recipes.html"; 
        };

        reader.readAsDataURL(imageInput.files[0]); 
    });
});
