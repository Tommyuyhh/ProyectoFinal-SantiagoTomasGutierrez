document.getElementById('agregar-campos').addEventListener('click', function() {
    const cantidad = parseInt(document.getElementById('cantidad-productos').value);
    const preciosContainer = document.getElementById('precios-container');
    preciosContainer.innerHTML = ''; // Limpiar campos anteriores

    if (isNaN(cantidad) || cantidad < 1) {
        // Reemplazar alerta estándar con SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingrese una cantidad válida.',
        });
        return;
    }

    for (let i = 0; i < cantidad; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Precio del producto ${i + 1}`;
        input.className = 'precio-producto';
        preciosContainer.appendChild(input);
    }
});

document.getElementById('calcular-total').addEventListener('click', function() {
    const precios = document.querySelectorAll('.precio-producto');
    let total = 0;

    precios.forEach(input => {
        const precio = parseFloat(input.value);
        if (!isNaN(precio)) {
            total += precio;
        }
    });

    // Mostrar notificación con Toastify
    Toastify({
        text: `Total: $${total.toFixed(2)}`,
        duration: 3000,
        close: true,
        gravity: "top", // Posición de la notificación: top or bottom
        position: "center", // left, center or right
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();

    document.getElementById('resultado').textContent = `Total: $${total.toFixed(2)}`;
});
