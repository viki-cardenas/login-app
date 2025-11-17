function login() {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass })
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok) {
            localStorage.setItem("user", email);
            window.location.href = "home.html";
        } else {
            document.getElementById("error").innerText = "Correo o contraseña incorrectos";
        }
    });
}
