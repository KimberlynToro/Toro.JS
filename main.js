class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const Jersey = new Producto(1, "Jersey Rayas", 4500, "img/jersey2.jpg");
const Canale = new Producto(2, "Jersey Canale", 4200, "img/jersey3.jpg");
const Vestido = new Producto(3, "Vestido Básico", 3000, "img/jersey4.jpg");
const Cropped = new Producto(4, "Jersey Cropped", 2200, "img/jersey6.jpg");
const Top = new Producto(5, "Top Halter", 2800, "img/jersey7.jpg");
const CropTop = new Producto(6, "Crop Top", 3500, "img/jersey8.jpg");
const Halter= new Producto(7, "Vestido Halter", 3000, "img/jersey5.jpg");
const Perkins= new Producto(8, "Jersey Perkins", 4000, "img/jersey9.jpg");

const productos = [Jersey, Canale, Vestido, Cropped, Top, CropTop, Halter, Perkins];

console.log (productos)

let carrito = [];
 

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


const contenedorProductos = document.getElementById("contenedorProductos");


const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                        <div class = "card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = " ${producto.nombre}">
                            <div class ="card-body">
                                <h5> ${producto.nombre} </h5>
                                <p> ${producto.precio} </p>
                                <button class= "btn colorBoton" id = "boton${producto.id}" >Agregar al Carrito</button>
                            </div>
                        </div>`

        contenedorProductos.appendChild(card);
 

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
    })
}


const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
        
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    calcularTotal();
}

mostrarProductos();

//MOSTRAR EL CARRITO DE COMPRAS. 

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click",  () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
                        <div class = "card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = " ${producto.nombre}">
                            <div class ="card-body">
                                <h5> ${producto.nombre} </h5>
                                <p> ${producto.precio} </p>
                                <p> ${producto.cantidad} </p>
                                <button class= "btn colorBoton" id ="eliminar${producto.id}" >Eliminar producto</button>
                            </div>
                        </div>`

        contenedorCarrito.appendChild(card);


        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find( producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    if (producto.cantidad !== 1){
        producto.cantidad --;
    } else {
        carrito = carrito.filter(producto => producto.id !== id)
    }

    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}