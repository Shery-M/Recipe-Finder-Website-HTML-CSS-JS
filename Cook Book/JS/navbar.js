document.addEventListener("DOMContentLoaded", function () {
    const navbarList = document.getElementById("navbar-list");

   
    const accountType = localStorage.getItem("accountType");

    if (accountType === "true") {
        //if admin
        navbarList.innerHTML = `
            <li><a href="main.html">Main</a></li>
            <li><a href="admin.html">Home</a></li>
            <li><a href="recipes.html">Recipes</a></li>
            <li><a href="addnew.html">Add Recipe</a></li>
            <li><a href="edit_recipe.html">Edit Recipe</a></li>
            <li><a href="#" class="logout-btn">Logout</a></li>
        `;
    } else {
        //if user
        navbarList.innerHTML = `
            <li><a href="main.html">Main</a></li>
            <li><a href="user.html">Home</a></li>
            <li><a href="recipes.html">Recipes</a></li>
            <li><a href="favorites.html">Favorites</a></li>
            <li><a href="#" class="logout-btn">Logout</a></li>
        `;
    }

    
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("logout-btn")) {
            e.preventDefault(); 
           //localStorage.clear(); 
            window.location.href = "main.html"; 
        }
    });
});
