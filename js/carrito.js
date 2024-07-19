// carrito.js
document.getElementById('agregar-campos').addEventListener('click', function() {
    const cantidad = parseInt(document.getElementById('cantidad-productos').value);
    const preciosContainer = document.getElementById('precios-container');
    preciosContainer.innerHTML = ''; // Limpiar campos anteriores

    if (isNaN(cantidad) || cantidad < 1) {
        alert('Por favor, ingrese una cantidad válida.');
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

    document.getElementById('resultado').textContent = `Total: $${total.toFixed(2)}`;
});
