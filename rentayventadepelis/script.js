const carrito = [];
const carritoElement = document.querySelector("#carrito");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const imgCarrito = document.querySelector("#img-carrito");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");


imgCarrito.addEventListener("click", () => {
    carritoElement.classList.toggle("hidden");
});


vaciarCarritoBtn.addEventListener("click", () => {
    vaciarCarrito();
});

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price.replace('.', ''));
        agregarAlCarrito(name, price);
    });
});


function agregarAlCarrito(name, price) {
    const existeProducto = carrito.find(producto => producto.name === name);
    if (existeProducto) {
        existeProducto.cantidad += 1;
    } else {
        carrito.push({ name, price, cantidad: 1 });
    }
    actualizarCarrito();
}


function actualizarCarrito() {
   
    listaCarrito.innerHTML = '';
    
    carrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="img/pelicula.jpg" alt="${producto.name}" width="50"></td>
            <td>${producto.name}</td>
            <td>$${producto.price.toLocaleString()}</td>
            <td>${producto.cantidad}</td>
            <td>
                <button class="remove-item bg-red-500 text-white p-2 rounded" data-name="${producto.name}">X</button>
            </td>
        `;
        listaCarrito.appendChild(row);
    });

  
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const name = e.target.dataset.name;
            eliminarProducto(name);
        });
    });
}


function eliminarProducto(name) {
    const index = carrito.findIndex(producto => producto.name === name);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }
}


function vaciarCarrito() {
    carrito.length = 0;
    actualizarCarrito();
}
