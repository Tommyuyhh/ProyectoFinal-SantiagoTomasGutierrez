document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const usernameInput = document.getElementById('new-username');
    const passwordInput = document.getElementById('new-password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el envío tradicional del formulario
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validar campos
        if (!username || !password) {
            showMessage('Por favor, completa todos los campos.', 'error');
            return;
        }

        try {
            // Mostrar mensaje de carga
            showMessage('Registrando...', 'loading');
            
            // Realizar la solicitud AJAX
            const response = await fetch('https://example.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Verificar el estado de la respuesta
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();

            // Manejar la respuesta de la API
            if (data.success) {
                showMessage('Registro exitoso!', 'success');
                // Redirigir después de un pequeño retraso
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showMessage('Error en el registro. Inténtalo de nuevo.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Ocurrió un error. Inténtalo de nuevo.', 'error');
        }
    });

    function showMessage(message, type) {
        const messageDiv = document.querySelector('.message') || createMessageDiv();
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
    }

    function createMessageDiv() {
        const div = document.createElement('div');
        div.className = 'message';
        form.appendChild(div);
        return div;
    }
});
