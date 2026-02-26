document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting the default way

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Validate fields are not empty
        if (!username || !password) {
            alert("All fields are required.");
            return;
        }

        fetch(
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
        )
            .then((response) => response.json())
            .then((response) => {
                sessionStorage.setItem("userProfile", JSON.stringify(response));
            });
    });
