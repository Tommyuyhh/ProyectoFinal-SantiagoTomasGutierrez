// preentrega3.js

// AJAX para obtener datos de productos
function obtenerDatosProductos() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'path_to_your_json_file.json', true);  // Cambia 'path_to_your_json_file.json' por la ruta correcta
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else if (xhr.readyState === 4) {
                reject('Error al cargar los datos');
            }
        };
        xhr.send();
    });
}

// Manejo del carousel
let slideIndex = 0;

function showSlides() {
    const slides = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Cambia la imagen cada 3 segundos
}

function nextSlide() {
    slideIndex++;
    showSlides();
}

function prevSlide() {
    slideIndex--;
    showSlides();
}

document.addEventListener('DOMContentLoaded', (event) => {
    showSlides(); // Inicializar el carousel
    obtenerDatosProductos()
        .then(productos => {
            // Aquí puedes utilizar los datos obtenidos
            console.log(productos);
            cargarProductos(productos);
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al cargar los productos!'
            });
        });

    // Asignar eventos a botones de compra
    const botonesComprar = document.querySelectorAll('.comprar-btn');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            agregarAlCarrito();
        });
    });
});

// Función para cargar productos en la grilla
function cargarProductos(productos) {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; // Limpiar productos anteriores

    productos.forEach(producto => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.innerHTML = `
            <a href="#"><img src="${producto.imagen}" alt=""></a>
            <div class="desc-product">
                <h2>${producto.nombre}</h2>
                <p>$${producto.precio}</p>
                <button class="btn comprar-btn" onclick="agregarAlCarrito()">COMPRAR</button>
            </div>
        `;
        gridContainer.appendChild(gridItem);
    });

    // Asignar eventos a botones de compra nuevamente después de agregar productos dinámicamente
    const botonesComprar = document.querySelectorAll('.comprar-btn');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', () => {
            agregarAlCarrito();
        });
    });
}

// Manejo del carrito
let contadorCarrito = 0;
const contadorCarritoElemento = document.getElementById('contador-carrito');

function agregarAlCarrito() {
    contadorCarrito++;
    actualizarCarrito();
}

function actualizarCarrito() {
    contadorCarritoElemento.textContent = contadorCarrito;
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#4CAF50",
    }).showToast();
}
