//carrito
document.addEventListener("DOMContentLoaded", () => {
    const botonesComprar = document.querySelectorAll(".btn"); // Selecciona todos los botones "COMPRAR"
    const contadorCarritoElemento = document.getElementById("contador-carrito");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const actualizarContadorCarrito = () => {
        contadorCarritoElemento.textContent = carrito.length;
    };

    const guardarCarritoEnLocalStorage = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    botonesComprar.forEach(boton => {
        boton.addEventListener("click", (event) => {
            const productoElemento = event.target.closest(".grid-item");
            const nombreProducto = productoElemento.querySelector("h2").textContent;
            const precioProducto = productoElemento.querySelector("p").textContent;

            const producto = { nombre: nombreProducto, precio: precioProducto };

            carrito.push(producto);
            guardarCarritoEnLocalStorage();
            actualizarContadorCarrito();
        });
    });
    actualizarContadorCarrito();

});
