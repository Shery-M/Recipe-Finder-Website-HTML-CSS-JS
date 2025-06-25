
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const username = document.querySelector('input[name="username"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-password"]').value;
    const email = document.querySelector('input[name="email"]').value.trim();
    const isAdmin = document.querySelector('input[name="is_admin"]:checked').value;

    if (password !== confirmPassword) {
        document.getElementById("password-error").textContent = "Passwords do not match!";
        return;
    }

    const user = {
        username,
        password,
        email,
        isAdmin
    };

    localStorage.setItem("user_" + username, JSON.stringify(user));
    localStorage.setItem("accountType", isAdmin);

    const key = "favorites_" + username;
    localStorage.setItem(key, JSON.stringify([]));

    localStorage.setItem("currentUser", username);

    if (isAdmin === "true") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "user.html";
    }
});
