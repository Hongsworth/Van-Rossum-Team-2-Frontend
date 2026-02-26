document
    .getElementById("login-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("All fields are required.");
            return;
        }

        try {
            const response = await fetch(
                "https://van-rossum-team-2-production.up.railway.app/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: username,
                        password: password,
                    }),
                },
            );

            if (!response.ok) {
                alert("Login failed: Invalid username or password");
                return;
            }

            const data = await response.json();

            sessionStorage.setItem("userProfile", JSON.stringify(data));

            location.href = "/pages/user-profile/user-profile.html";
        } catch (err) {
            alert("An error occurred during login.");
        }
    });
