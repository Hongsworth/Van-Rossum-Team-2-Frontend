document
    .getElementById("register-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from submitting the default way

        const email = document.getElementById("register-form__email").value;
        const username = document.getElementById(
            "register-form__username",
        ).value;
        const password = document.getElementById(
            "register-form__password",
        ).value;

        // Validate fields are not empty
        if (!username || !password || !email) {
            console.log(username);
            console.log(password);
            console.log(email);
            alert("All fields are required.");
            return;
        }

        try {
            const response = await fetch(
                "https://van-rossum-team-2-production.up.railway.app/api/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        name: username,
                        password: password,
                    }),
                },
            );

            if (!response.ok) {
                alert("Registering failed: Invalid details");
                return;
            }
            try {
                const loginResponse = await fetch(
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
                if (!loginResponse.ok) {
                    alert("Login failed: Server error");
                    return;
                }

                const loginData = await loginResponse.json();
                sessionStorage.setItem(
                    "userProfile",
                    JSON.stringify(loginData),
                );
            } catch (err) {
                alert("An error occurred during login after registration.");
            }
            location.href = "/pages/user-profile/user-profile.html";
        } catch (err) {
            alert("An error occurred during registration.");
        }
    });
