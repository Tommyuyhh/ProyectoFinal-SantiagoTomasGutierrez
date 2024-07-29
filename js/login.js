// Utilizaremos Fetch API para manejar la solicitud AJAX
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el envío tradicional del formulario

        const username = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;

        try {
            // Muestra un mensaje de carga
            messageDiv.textContent = 'Iniciando sesión...';
            messageDiv.classList.add('loading');
            
            // Realiza la solicitud AJAX
            const response = await fetch('https://example.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Verifica el estado de la respuesta
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();

            // Maneja la respuesta de la API
            if (data.success) {
                messageDiv.textContent = 'Inicio de sesión exitoso!';
                messageDiv.classList.add('success');
                // Redirige o realiza alguna acción adicional
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);
            } else {
                messageDiv.textContent = 'Nombre de usuario o contraseña incorrectos.';
                messageDiv.classList.add('error');
            }
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = 'Ocurrió un error. Inténtalo de nuevo.';
            messageDiv.classList.add('error');
        } finally {
            messageDiv.classList.remove('loading');
        }
    });
});
