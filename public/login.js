document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("login");
    const registerButton = document.getElementById("register");

    loginButton.addEventListener("click", async function() {
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
            const requestData = {
                username: usernameInput,
                email: emailInput,
                password: passwordInput
            };

            try {
                // Send login data
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
    
                if (response.ok) {
                    // Navigate to EncounterCreatorMain.html
                    window.location.href = "EncounterCreatorMain.html";
                }
                
                else {
                    alert("Login credentials incorrect. Please try again.");
                }
            }
            
            catch (error) {
                console.error('Error logging in:', error);
                alert("An error occurred while logging in. Please try again.");
            }
        }
    });

    registerButton.addEventListener("click", async function() {
        const emailInput = document.getElementById("email").value;
        const usernameInput = document.getElementById("username").value;
        const passwordInput = document.getElementById("password").value;

        if (emailInput.trim() === "" || usernameInput.trim() === "" || passwordInput.trim() === "") {
            alert("Please enter either your email address, a username, and a password!");
        }
        
        else {
            const requestData = {
                username: usernameInput,
                email: emailInput,
                password: passwordInput
            };

            try {
                // Send login data
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
    
                if (response.ok) {
                    // Navigate to EncounterCreatorMain.html
                    window.location.href = "EncounterCreatorMain.html";
                }
                
                else if (response.status === 408){
                    alert("An account with this email already exists. Please use a different email address.");
                }

                else if (response.status === 409) {
                    alert("An account with this username already exists. Please use a different username.");
                }

                else {
                    alert("An error occurred while registering account. Please try again.");
                }
            }
            
            catch (error) {
                console.error('Error registering account:', error);
                alert("An error occurred while registering account. Please try again.");
            }
        }
    });
});
