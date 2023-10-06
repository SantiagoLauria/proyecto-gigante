let total = 0;
let pokemon;
let numeroRandom;
// Funcion numeros aleatorios
const random = () => Math.floor(Math.random() * (251 - 1)) + 1;

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
      mostrarCompaniero(pokemon);
    });
}
// Funcion para insertar el compañero
function mostrarCompaniero(pokemon) {
  const contenedor = document.querySelector("#companiero");

  let div = document.createElement("div");

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
    let elemento = document.querySelector("#companiero");
    elemento.remove();
  });
  // Evento del boton regenerar
  const btnRegenerar = document.querySelector("#btn-regenerar");
  btnRegenerar.addEventListener("click", () => {
    localStorage.removeItem("pokemon");
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }
    fetchCompaniero();
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

  // let button = document.createElement("button");
  // button.classList.add("btn", "btn-quitar", "text-danger");
  // let i = document.createElement("i");
  // i.classList.add("bi", "bi-dash-circle-fill");
  // i.setAttribute("id", `btn-quitar${producto.id}`);

  // button.append(i);

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

// Función para insertar HTML del stock
function insertarHTMLStock(producto) {
  let bloqueNuevo = document.createElement("li");
  bloqueNuevo.classList.add("list-group-item");

  let labelNuevo = document.createElement("label"); // <label> con atributos correspondientes
  labelNuevo.setAttribute("for", `stock${producto.id}`);
  labelNuevo.setAttribute("id", `stock${producto.id}-label`);
  labelNuevo.innerHTML = `${producto.nombre}  $${producto.precio}`;

  let inputNuevo = document.createElement("input"); // <input> con las clases y demás atributos necesarios
  inputNuevo.classList.add("ml-auto");
  inputNuevo.setAttribute("type", "number");
  inputNuevo.setAttribute("name", `stock${producto.id}`);
  inputNuevo.setAttribute("id", `stock${producto.id}-input`);

  let pNuevo = document.createElement("p"); // Display del stock con DOM
  pNuevo.setAttribute("id", `stockValor${producto.id}`);
  pNuevo.classList.add("fw-bold");
  pNuevo.innerHTML = producto.stock;

  bloqueNuevo.append(labelNuevo, inputNuevo, pNuevo); // Append de todos los elementos
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
    if (numero < 0 || numero > stock) {
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
      "Revisa las cantidades ingresadas e inténtalo nuevamente"
    );
  }

  let elementoTotal = document.querySelector("#total");
  elementoTotal.innerText = `Total $${total}`;
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para cargar productos desde localStorage
async function cargarProductos() {
  try {
    const productosGuardados = await obtenerProductosDeLocalStorage();
    productos.forEach((elemento, i) => {
      productos[i].id = productosGuardados[i].id;
      productos[i].nombre = productosGuardados[i].nombre;
      productos[i].precio = productosGuardados[i].precio;
      productos[i].stock = productosGuardados[i].stock;
    });
    sweetAlert("success", "Stock cargado con éxito");
  } catch (error) {
    sweetAlert("warning", "No se pudo cargar el stock");
  }
}

// Función para obtener productos de localStorage
function obtenerProductosDeLocalStorage() {
  return new Promise((resolve, reject) => {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
      resolve(JSON.parse(productosGuardados));
    } else {
      reject("No hay datos en localStorage");
    }
  });
}
// Promesa y función asíncrona para cargar productos de localStorage y stock
obtenerProductosDeLocalStorage()
  .then(() => {
    cargarProductos();
  }, 0)
  .catch(sweetAlert("warning", "No hay stock guardado"));

setTimeout(() => {
  productos.forEach((producto) => insertarHTMLStock(producto));
  for (let i = 0; i < productos.length; i++) {
    let cantidad = productos[i].stock;
    let valor = document.querySelector(`#stockValor${i + 1}`);
    valor.innerHTML = cantidad;
  }
}, 0);

// Declaración del contenedor donde se insertan los productos
const contenedor = document.querySelector("#lista-productos");
const contenedorStock = document.querySelector("#lista-stock");

// Iteración para la inserción del código HTML correspondiente a cada producto
setTimeout(() => {
  productos.forEach((producto) => instertarHTMLDeProductos(producto));
  liTotal();
}, 0);

// Eventos
const botonCalcular = document.querySelector("#btn-calcular");
botonCalcular.addEventListener("click", () => {
  calcular();
});

// Evento y función de guardar stock
const botonGuardarStock = document.querySelector("#btn-guardar-stock");
botonGuardarStock.addEventListener("click", () => {
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
});

setTimeout(() => {
  productos.forEach((producto) => insertarEditarProductos(producto));
}); // Para insertar en el HTML los elementos para editar
const botonEditar = document.querySelector("#btn-editar-guardar");
botonEditar.addEventListener("click", () => {
  productos.forEach((element, i) => {
    let nombre = document.querySelector(`#prod${i + 1}-nombre`).value;
    let precio = document.querySelector(`#prod${i + 1}-precio`).value;
    if (productos[i].nombre != nombre) {
      // Validación para aplicar cambios solo a valores distintos para no perder stock previo
      productos[i].nombre = nombre;
      productos[i].stock = 0;
    }
    productos[i].precio != precio && (productos[i].precio = precio);
  });
  setTimeout(() => {
    document.querySelector("#lista-productos").innerHTML = ""; // Para actualizar la lista de productos
    productos.forEach((producto) => instertarHTMLDeProductos(producto));
    liTotal();
    document.querySelector("#lista-editar-productos").innerHTML = "";
    let li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "justify-content-between",
      "align-items-center"
    );
    let div = document.createElement("div"); // Para actualizar la lista de editar
    let div2 = document.createElement("div");

    div.classList.add("fw-bold");
    div.innerText = "Nombre";

    div2.classList.add("fw-bold");
    div2.innerText = "Precio";

    li.append(div, div2);
    document.querySelector("#lista-editar-productos").append(li);
    productos.forEach((producto) => insertarEditarProductos(producto));

    document.querySelector("#lista-stock").innerHTML = "";
    productos.forEach((producto) => insertarHTMLStock(producto)); //Para actualizar la lista del stock
    for (let i = 0; i < productos.length; i++) {
      let cantidad = productos[i].stock;
      let valor = document.querySelector(`#stockValor${i + 1}`);
      valor.innerHTML = cantidad;
    }
  }, 0);
  localStorage.setItem("productos", JSON.stringify(productos));
});
