document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("login");

    loginButton.addEventListener("click", function() {
        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;

        if (usernameInput.trim() === "" && passwordInput.trim() === "") {
            alert("Missing username and password!");
        } else if (usernameInput.trim() === "") {
            alert("Missing username!");
        } else if (passwordInput.trim() === "") {
            alert("Missing password!");
        } else {
            // Navigate to EncounterCreatorMain.html
            window.location.href = "EncounterCreatorMain.html";
        }
    });
});
