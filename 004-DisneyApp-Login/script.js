document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Previene el comportamiento por defecto del formulario (recargar la página)
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            // Guardar usuario en localStorage para recordar la sesión
            localStorage.setItem("usuario", JSON.stringify(data.username));

            // Redirigir a la página principal después de login exitoso
            window.location.href = "http://127.0.0.1:5500/index.html";  
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Hubo un problema al intentar iniciar sesión.');
    }
});