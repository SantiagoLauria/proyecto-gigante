let total = 0;
let pokemon;
let numeroRandom;
// Funcion numeros aleatorios
const random = () => Math.floor(Math.random() * (251 - 1)) + 1;

setTimeout(() => {
  fetchCompaniero();
}, 500);

function fetchCompaniero() {
  if (!localStorage.getItem("pokemon")) {
    localStorage.setItem("pokemon", `${random()}`);
  }
  numeroRandom = localStorage.getItem("pokemon");
  fetch(`https://pokeapi.co/api/v2/pokemon/${numeroRandom}/`)
    .then((resp) => resp.json())
    .then((data) => {
      pokemon = data;
      console.log(pokemon);
      console.log(pokemon.name);
      mostrarCompaniero(pokemon);
    });
}
// Funcion para insertar el compañero
function mostrarCompaniero(pokemon) {
  const contenedor = document.querySelector("#companiero");

  let div = document.createElement("div");
  div;

  let p = document.createElement("p"); // Nombre
  p.classList.add("m-0");
  p.innerText = `${pokemon.name} te saluda!`;

  let img = document.createElement("img"); // Sprite del pkm
  img.setAttribute("src", pokemon.sprites.front_default);

  let botonBorrar = document.createElement("button"); // Botón con ícono
  botonBorrar.classList.add("btn");
  botonBorrar.setAttribute("id", "btn-companiero");
  let i = document.createElement("i");
  i.classList.add("bi", "bi-x-circle", "text-light");
  botonBorrar.appendChild(i);

  let botonRegenerar = document.createElement("button");
  botonRegenerar.classList.add("btn");
  botonRegenerar.setAttribute("id", "btn-regenerar");
  i = document.createElement("i");
  i.classList.add("bi", "bi-arrow-repeat", "text-light");
  botonRegenerar.appendChild(i);

  div.appendChild(botonRegenerar);
  div.appendChild(botonBorrar);
  contenedor.append(div, img, p);

  // Evento del botón de borrar
  const btnBorrar = document.querySelector("#btn-companiero");
  btnBorrar.addEventListener("click", () => {
    eliminarCompaniero();
  });
  const btnRegenerar = document.querySelector("#btn-regenerar");
  btnRegenerar.addEventListener("click", () => {
    localStorage.removeItem("pokemon");
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }
    fetchCompaniero();
  });
}

// Funcion para eliminar compañero
function eliminarCompaniero() {
  let elemento = document.querySelector("#companiero");
  console.log(elemento);
  elemento.remove();
}

// Funciones para falicitar hacer alertas
function sweetAlert(icono, mensaje) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icono,
    title: mensaje,
  });
}

// Lista de productos

const productos = [
  { id: 1, nombre: "Heineken", precio: 1500, stock: 0 },
  { id: 2, nombre: "Miller", precio: 1300, stock: 0 },
  { id: 3, nombre: "Santa Fe Pilsen", precio: 1000, stock: 0 },
  { id: 4, nombre: "Gaseosa 1,5L", precio: 900, stock: 0 },
  { id: 5, nombre: "Aquarius 1,5L", precio: 700, stock: 0 },
  { id: 6, nombre: "Powerade 500ml", precio: 500, stock: 0 },
  { id: 7, nombre: "Monster Energy", precio: 700, stock: 0 },
];

// Función editar productos
function insertarEditarProductos(producto) {
  let li = document.createElement("li");
  li.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "list-group-item"
  );
  let inputNombre = document.createElement("input");
  inputNombre.setAttribute("id", `prod${producto.id}-nombre`);
  inputNombre.setAttribute("value", `${producto.nombre}`);
  let inputPrecio = document.createElement("input");
  inputPrecio.setAttribute("id", `prod${producto.id}-precio`);
  inputPrecio.setAttribute("value", `${producto.precio}`);
  li.append(inputNombre, inputPrecio);

  document.querySelector("#lista-editar-productos").append(li);
}

// Función para insertar código HTML de cada producto
function instertarHTMLDeProductos(producto) {
  let bloqueNuevo = document.createElement("li");
  bloqueNuevo.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between"
  );

  let labelNuevo = document.createElement("label");
  labelNuevo.setAttribute("for", `prod${producto.id}`);
  labelNuevo.setAttribute("id", `prod${producto.id}-label`);
  labelNuevo.innerHTML = `${producto.nombre}  $${producto.precio}`;

  let inputNuevo = document.createElement("input");
  inputNuevo.setAttribute("type", "number");
  inputNuevo.setAttribute("name", `prod${producto.id}`);
  inputNuevo.setAttribute("id", `prod${producto.id}-input`);

  bloqueNuevo.appendChild(labelNuevo);
  bloqueNuevo.appendChild(inputNuevo);
  contenedor.appendChild(bloqueNuevo);
}

function liTotal() {
  let bloqueNuevo = document.createElement("li");
  bloqueNuevo.classList.add(
    "list-group-item",
    "bg-primary-subtle",
    "fw-bold",
    "text-center"
  );
  bloqueNuevo.setAttribute("id", "total");
  bloqueNuevo.innerHTML = `Total $${total}`;
  contenedor.appendChild(bloqueNuevo);
}

function liStock() {
  let bloqueNuevo = document.createElement("li");
  bloqueNuevo.classList.add(
    "list-group-item",
    "bg-primary-subtle",
    "fw-bold",
    "text-center"
  );
  bloqueNuevo.setAttribute("id", "total");
  bloqueNuevo.innerHTML = `Total $${total}`;
  contenedorStock.appendChild(bloqueNuevo);
}

// Función para insertar HTML del stock
function insertarHTMLStock(producto) {
  let bloqueNuevo = document.createElement("li");
  bloqueNuevo.classList.add("list-group-item");

  let labelNuevo = document.createElement("label");
  labelNuevo.setAttribute("for", `stock${producto.id}`);
  labelNuevo.setAttribute("id", `stock${producto.id}-label`);
  labelNuevo.innerHTML = `${producto.nombre}  $${producto.precio}`;

  let inputNuevo = document.createElement("input");
  inputNuevo.classList.add("ml-auto");
  inputNuevo.setAttribute("type", "number");
  inputNuevo.setAttribute("name", `stock${producto.id}`);
  inputNuevo.setAttribute("id", `stock${producto.id}-input`);

  let pNuevo = document.createElement("p");
  pNuevo.setAttribute("id", `stockValor${producto.id}`);
  pNuevo.classList.add("fw-bold");
  pNuevo.innerHTML = producto.stock;

  bloqueNuevo.appendChild(labelNuevo);
  bloqueNuevo.appendChild(inputNuevo);
  bloqueNuevo.appendChild(pNuevo);
  contenedorStock.appendChild(bloqueNuevo);
}

// Función que toma los inputs, multiplica el precio de cada producto por la cantidad ingresada y retorna el total
function calcular() {
  total = 0;
  let todoBien = true;
  productos.forEach((element, i) => {
    let numero = parseInt(document.querySelector(`#prod${i + 1}-input`).value);
    let stock = document.querySelector(`#stockValor${i + 1}`).innerText;

    //  Validación de que lo vendido sea menor al stock
    if (numero < 0 || numero >= stock) {
      todoBien = false;
    }
  });

  if (todoBien) {
    productos.forEach((element, i) => {
      let numero = parseInt(
        document.querySelector(`#prod${i + 1}-input`).value
      );
      if (Number.isInteger(numero)) {
        total += numero * productos[i].precio;
        productos[i].stock -= numero;
        document.querySelector(`#stockValor${i + 1}`).innerText -= numero;
        document.querySelector(`#prod${i + 1}-input`).value = "";
      }
    });
    sweetAlert("success", "Calculado y restado del stock con éxito");
  } else {
    sweetAlert(
      "error",
      "Revisa la cantidades ingresadas e inténtalo nuevamente"
    );
  }

  let elementoTotal = document.querySelector("#total");
  elementoTotal.innerText = `Total $${total}`;
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para guardar el stock de cada producto en el array -productos- y pasarlos al HTML
function guardarStock() {
  let contador = 0;
  productos.forEach((elemento, i) => {
    let producto = productos[i];
    let nuevoValor = document.querySelector(`#stock${i + 1}-input`).value;

    // Validación de los datos ingresados para el stock
    if (nuevoValor != "" && nuevoValor > 0) {
      producto.stock = nuevoValor;
      document.querySelector(`#stockValor${i + 1}`).innerText = producto.stock;
      document.querySelector(`#stock${i + 1}-input`).value = "";
    } else if (nuevoValor < 0) {
      contador++;
      document.querySelector(`#stock${i + 1}-input`).value = "";
    }
  });

  contador > 0
    ? sweetAlert(
        "warning",
        "Alguno de los valores ingresados no son válidos\nEl resto se guardó con éxito"
      )
    : sweetAlert("success", "Stock guardado con éxito");
  localStorage.setItem("productos", JSON.stringify(productos)); // para guardar el stock en localStorage
}

function cargarProductos() {
  let listaProductos = JSON.parse(localStorage.getItem("productos"));
  productos.forEach((elemento, i) => {
    productos[i].id = listaProductos[i].id;
    productos[i].nombre = listaProductos[i].nombre;
    productos[i].precio = listaProductos[i].precio;
    productos[i].stock = listaProductos[i].stock;
  });
}
// Cargar lista de productos de localStorage

if (!localStorage.getItem("productos")) {
  sweetAlert("warning", "No hay ningún stock guardado");
  localStorage.setItem("productos", JSON.stringify(productos));
} else {
  cargarProductos();

  sweetAlert("success", "Stock cargado con éxito");
}

// Declaración del contenedor donde se insertan los productos
const contenedor = document.querySelector("#lista-productos");
const contenedorStock = document.querySelector("#lista-stock");

// Iteración para la inserción del código HTML correspondiente a cada producto
productos.forEach((producto) => instertarHTMLDeProductos(producto));
liTotal();

productos.forEach((producto) => insertarHTMLStock(producto));
for (let i = 0; i < productos.length; i++) {
  let cantidad = productos[i].stock;
  let valor = document.querySelector(`#stockValor${i + 1}`);
  valor.innerHTML = cantidad;
}
// liStock();

// Eventos
const botonCalcular = document.querySelector("#btn-calcular");
botonCalcular.addEventListener("click", () => {
  calcular();
});

const botonGuardarStock = document.querySelector("#btn-guardar-stock");
botonGuardarStock.addEventListener("click", () => {
  guardarStock();
});

productos.forEach((producto) => insertarEditarProductos(producto));
const botonEditar = document.querySelector("#btn-editar-guardar");
botonEditar.addEventListener("click", () => {
  productos.forEach((element, i) => {
    let producto = productos[i];
    let nombre = document.querySelector(`#prod${i + 1}-nombre`).value;
    let precio = document.querySelector(`#prod${i + 1}-precio`).value;
    if (productos[i].nombre != nombre) {
      productos[i].nombre = nombre;
      productos[i].stock = 0;
    }
    productos[i].precio != precio && (productos[i].precio = precio);
    console.log(productos);
  });
  localStorage.setItem("productos", JSON.stringify(productos));
});
