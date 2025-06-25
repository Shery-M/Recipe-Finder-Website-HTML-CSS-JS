document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
  
    function performSearch() {
      const query = searchInput.value.trim();
      if (query !== "") {
        localStorage.setItem("searchQuery", query);
        window.location.href = "recipes.html";
      }
    }
  
    searchButton.addEventListener("click", performSearch);
  
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        performSearch();
      }
    });
  });
  
  
