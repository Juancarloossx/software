console.log('Script cargado'); // Verificación básica

document.getElementById("formRegister").addEventListener("submit", function(event){
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    fetch("/api/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, email, telefono, usuario, password })
    })
        .then(response => {
            console.log('Respuesta recibida:', response);
            if (!response.ok) {
                throw new Error('Error al intentar registrarse');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos del servidor:', data);
            if (data.success) {
                window.location.href = 'index.html';
                alert("usuario registrado correctamente.")
            } else {
                alert('Error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al registrar usuario: ' + error.message);
        });
});
