document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); 

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const isAdmin = document.querySelector('input[name="is_admin"]:checked').value;

  const storedUser = localStorage.getItem("user_" + username);


  document.getElementById("error-message").style.display = "none";

  if (!storedUser) {

      document.getElementById("error-message").textContent = "User not found. Please sign up first.";
      document.getElementById("error-message").style.display = "block";
      return; 
  }

  const user = JSON.parse(storedUser);

  if (user.password === password && user.isAdmin === isAdmin) {
      localStorage.setItem("currentUser", username);
      localStorage.setItem("accountType", user.isAdmin);

      if (isAdmin === "true") {
          window.location.href = "admin.html";
      } else {
          window.location.href = "user.html";
      }
  } else {
      document.getElementById("error-message").textContent = "Incorrect username, password, or account type.";
      document.getElementById("error-message").style.display = "block";
  }
});
