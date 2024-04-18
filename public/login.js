document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("login");
    const registerButton = document.getElementById("register");

    loginButton.addEventListener("click", function() {
        const emailInput = document.getElementById("email").value;
        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;

        if (emailInput.trim() === "" && usernameInput.trim() === "" && passwordInput.trim() === "") {
            alert("Please enter either your email address or username, and password!");
        }
        
        else if ((emailInput.trim() === "" && usernameInput.trim() === "")) {
            alert("Missing email/username!");
        }
        
        else if (passwordInput.trim() === "") {
            alert("Missing password!");
        }
        
        else {
            // Navigate to EncounterCreatorMain.html
            window.location.href = "EncounterCreatorMain.html";
        }
    });

    registerButton.addEventListener("click", function() {
        const emailInput = document.getElementById("email").value;
        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;

        if (emailInput.trim() === "" || usernameInput.trim() === "" || passwordInput.trim() === "") {
            alert("Please enter either your email address, a username, and a password!");
        }
        
        else {
            // Navigate to EncounterCreatorMain.html
            window.location.href = "EncounterCreatorMain.html";
        }
    });
});
