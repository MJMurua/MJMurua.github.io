'use strict';

let productos = [
  {
    id: 1,
    nombre: 'Laptop ASUS',
    descripcion: 'Laptop ASUS VivoBook 15 con procesador Intel Core i5, 8GB de RAM y 512GB SSD.',
    precio: 750,
    imagen: 'laptop-asus.jpg',
    categoria: 'Laptops',
  },
  {
    id: 2,
    nombre: 'Laptop Dell XPS',
    descripcion: 'Laptop Dell XPS 13 con procesador Intel Core i7, 16GB de RAM y 1TB SSD.',
    precio: 1200,
    imagen: 'laptop-dell.jpg',
    categoria: 'Laptops',
  },
  {
    id: 3,
    nombre: 'Laptop HP Spectre',
    descripcion: 'Laptop HP Spectre x360 con procesador Intel Core i7, 16GB de RAM y 512GB SSD.',
    precio: 1100,
    imagen: 'laptop-hp.jpg',
    categoria: 'Laptops',
  },
  {
    id: 4,
    nombre: 'Smartphone Samsung Galaxy',
    descripcion: 'Smartphone Samsung Galaxy S21 con pantalla de 6.2 pulgadas y 128GB de almacenamiento.',
    precio: 850,
    imagen: 'smartphone-samsung.jpg',
    categoria: 'Smartphones',
  },
  {
    id: 5,
    nombre: 'Smartphone iPhone 12',
    descripcion: 'Smartphone Apple iPhone 12 con pantalla de 6.1 pulgadas y 128GB de almacenamiento.',
    precio: 999,
    imagen: 'smartphone-iphone.jpg',
    categoria: 'Smartphones',
  },
  {
    id: 6,
    nombre: 'Smartphone Google Pixel',
    descripcion: 'Smartphone Google Pixel 5 con pantalla de 6 pulgadas y 128GB de almacenamiento.',
    precio: 699,
    imagen: 'smartphone-google.jpg',
    categoria: 'Smartphones',
  },
  {
    id: 7,
    nombre: 'Auriculares Bose',
    descripcion: 'Auriculares Bose QuietComfort 35 II con cancelación de ruido activa.',
    precio: 299,
    imagen: 'auriculares-bose.jpg',
    categoria: 'Accesorios',
  },
  {
    id: 8,
    nombre: 'Teclado Mecánico Razer',
    descripcion: 'Teclado mecánico Razer BlackWidow con switches verdes.',
    precio: 129,
    imagen: 'teclado-razer.jpg',
    categoria: 'Accesorios',
  },
  {
    id: 9,
    nombre: 'Monitor LG UltraWide',
    descripcion: 'Monitor LG UltraWide de 29 pulgadas con resolución Full HD.',
    precio: 250,
    imagen: 'monitor-lg.jpg',
    categoria: 'Accesorios',
  },
  {
    id: 10,
    nombre: 'Smartwatch Apple Watch',
    descripcion: 'Apple Watch Series 6 con GPS y monitor de salud.',
    precio: 399,
    imagen: 'smartwatch-apple.jpg',
    categoria: 'Accesorios',
  },
  {
    id: 11,
    nombre: 'Cámara GoPro',
    descripcion: 'Cámara GoPro HERO9 Black con capacidad de grabación en 5K.',
    precio: 450,
    imagen: 'camara-gopro.jpg',
    categoria: 'Accesorios',
  },
  {
    id: 12,
    nombre: 'Disco Duro Externo Seagate',
    descripcion: 'Disco duro externo Seagate de 2TB con USB 3.0.',
    precio: 89,
    imagen: 'disco-duro-seagate.jpg',
    categoria: 'Accesorios',
  },
];

//------------------------------------------------------------//

function cargarProductos() {
  const contenedorProductos = document.getElementById('productos');
  contenedorProductos.innerHTML = ''; // Limpiar productos previos

  productos.forEach(producto => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const div = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.textContent = producto.nombre;

    const pDesc = document.createElement('p');
    pDesc.textContent = producto.descripcion;

    const pPrecio = document.createElement('p');
    pPrecio.innerHTML = `Precio: $<span>${producto.precio.toFixed(2)}</span>`;

    const pCategoria = document.createElement('p');
    pCategoria.textContent = producto.categoria;

    const btnVerProducto = document.createElement('button');
    btnVerProducto.textContent = 'Ver Producto';
    btnVerProducto.addEventListener('click', () => mostrarDetalleProducto(producto));

    const btnAgregar = document.createElement('button');
    btnAgregar.textContent = 'Agregar';
    btnAgregar.addEventListener('click', () => {
      agregarAlCarrito(producto.id);
      actualizarMiniCarrito();
    });

    div.appendChild(h3);
    div.appendChild(pDesc);
    div.appendChild(pPrecio);
    div.appendChild(pCategoria);
    div.appendChild(btnVerProducto);
    div.appendChild(btnAgregar);

    li.appendChild(img);
    li.appendChild(div);

    contenedorProductos.appendChild(li);
  });
}




document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  document.querySelector('#minicarrito button').addEventListener('click', mostrarDetalleCarrito);
});





//-----------------------------------------------------------------------//
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(productoId) {
  const producto = productos.find(p => p.id === productoId);
  const itemEnCarrito = carrito.find(item => item.id === productoId);
  if (itemEnCarrito) {
    itemEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarMiniCarrito();
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(productoId) {
  const itemEnCarrito = carrito.find(item => item.id === productoId);
  if (itemEnCarrito) {
    if (itemEnCarrito.cantidad > 1) {
      itemEnCarrito.cantidad -= 1;
    } else {
      carrito = carrito.filter(item => item.id !== productoId);
    }
  }
  actualizarMiniCarrito();
}

//--------------------------------------------------------------------------------------//

// Función para actualizar la cantidad y el monto total en el mini carrito
function actualizarMiniCarrito() {
  const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const montoTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const spanCantidad = document.querySelector('#minicarrito p:nth-child(1) span');
  const spanTotal = document.querySelector('#minicarrito p:nth-child(2) span');

  spanCantidad.textContent = cantidadItems;
  spanTotal.textContent = montoTotal.toFixed(2);
}

//---------------------------------------------------------------------------------------//

// Función para mostrar los detalles del carrito en una ventana modal
function mostrarDetalleCarrito() {
  const modalCarrito = document.createElement('div');
  modalCarrito.classList.add('modal');
  modalCarrito.id = 'modalCarrito';

  const modalContent = document.createElement('div');

  const cerrar = document.createElement('a');
  cerrar.classList.add('cerrar');
  cerrar.href = '#';
  cerrar.textContent = 'X';
  cerrar.addEventListener('click', () => modalCarrito.remove());

  const pInfo = document.createElement('p');
  pInfo.innerHTML = `Items: <span>${carrito.length}</span> - Total: <span>$${carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2)}</span>`;

  const hr = document.createElement('hr');

  const ul = document.createElement('ul');
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nombre} <span>$${item.precio}</span> <span>${item.cantidad} items</span> <a href="#">Eliminar</a>`;
    li.querySelector('a').addEventListener('click', () => {
      eliminarDelCarrito(item.id);
      li.remove();
      pInfo.innerHTML = `Items: <span>${carrito.length}</span> - Total: <span>$${carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2)}</span>`;
    });
    ul.appendChild(li);
  });

  const btnVaciar = document.createElement('button');
  btnVaciar.textContent = 'Vaciar';
  btnVaciar.addEventListener('click', () => {
    carrito = [];
    modalCarrito.remove();
    actualizarMiniCarrito();
  });

  modalContent.appendChild(cerrar);
  modalContent.appendChild(pInfo);
  modalContent.appendChild(hr);
  modalContent.appendChild(ul);
  modalContent.appendChild(btnVaciar);

  modalCarrito.appendChild(modalContent);
  document.body.appendChild(modalCarrito);
}

//------------------------------------------------------------------------------------//

// Función para mostrar los detalles del producto en la ventana modal
function mostrarDetalleProducto(producto) {
  // Eliminar cualquier modal previo si existe
  const modalExistente = document.getElementById("modalProducto");
  if (modalExistente) {
    modalExistente.remove();
  }

  // Crear el modal del producto
  const modalProducto = document.createElement("div");
  modalProducto.classList.add("modal");
  modalProducto.id = "modalProducto";

  const modalContent = document.createElement("div");

  const cerrar = document.createElement("a");
  cerrar.classList.add("cerrar");
  cerrar.href = "#";
  cerrar.textContent = "X";
  cerrar.addEventListener("click", () => modalProducto.remove());

  const imgProducto = document.createElement("img");
  imgProducto.src = producto.imagen;
  imgProducto.alt = producto.nombre;
  imgProducto.id = "modalImgProducto";

  const h3Nombre = document.createElement("h3");
  h3Nombre.textContent = producto.nombre;
  h3Nombre.id = "modalNombreProducto";

  const pDescripcion = document.createElement("p");
  pDescripcion.textContent = producto.descripcion;
  pDescripcion.id = "modalDescripcionProducto";

  const pPrecio = document.createElement("p");
  pPrecio.innerHTML = `Precio: <span id="modalPrecioProducto">$${producto.precio.toFixed(
    2
  )}</span>`;

  const pCategoria = document.createElement("p");
  pCategoria.textContent = producto.categoria;
  pCategoria.id = "modalCategoriaProducto";

  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "Agregar";
  btnAgregar.id = "btnAgregarAlCarrito";
  btnAgregar.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
    modalProducto.remove();
  });

  modalContent.appendChild(cerrar);
  modalContent.appendChild(imgProducto);
  modalContent.appendChild(h3Nombre);
  modalContent.appendChild(pDescripcion);
  modalContent.appendChild(pPrecio);
  modalContent.appendChild(pCategoria);
  modalContent.appendChild(btnAgregar);

  modalProducto.appendChild(modalContent);
  document.body.appendChild(modalProducto);
}

//---------------------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();

  // Obtener referencias a los elementos de filtro
  const filtroLaptops = document.getElementById('filtroLaptops');
  const filtroSmartphones = document.getElementById('filtroSmartphones');
  const filtroAccesorios = document.getElementById('filtroAccesorios');

  // Event listeners para los filtros
  filtroLaptops.addEventListener('click', () => filtrarProductos('Laptops'));
  filtroSmartphones.addEventListener('click', () => filtrarProductos('Smartphones'));
  filtroAccesorios.addEventListener('click', () => filtrarProductos('Accesorios'));
});

function filtrarProductos(categoria) {
  const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
  mostrarProductosFiltrados(productosFiltrados);
}

function mostrarProductosFiltrados(productosFiltrados) {
  const contenedorProductos = document.getElementById('productos');
  contenedorProductos.innerHTML = ''; // Limpiar productos previos

  productosFiltrados.forEach(producto => {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const div = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.textContent = producto.nombre;

    const pDesc = document.createElement('p');
    pDesc.textContent = producto.descripcion;

    const pPrecio = document.createElement('p');
    pPrecio.innerHTML = `Precio: $<span>${producto.precio.toFixed(2)}</span>`;

    const pCategoria = document.createElement('p');
    pCategoria.textContent = producto.categoria;

    const btnVerProducto = document.createElement('button');
    btnVerProducto.textContent = 'Ver Producto';
    btnVerProducto.addEventListener('click', () => mostrarDetalleProducto(producto));

    const btnAgregar = document.createElement('button');
    btnAgregar.textContent = 'Agregar';
    btnAgregar.addEventListener('click', () => {
      agregarAlCarrito(producto.id);
      actualizarMiniCarrito();
    });

    div.appendChild(h3);
    div.appendChild(pDesc);
    div.appendChild(pPrecio);
    div.appendChild(pCategoria);
    div.appendChild(btnVerProducto);
    div.appendChild(btnAgregar);

    li.appendChild(img);
    li.appendChild(div);

    contenedorProductos.appendChild(li);
  });
}


