let total = 0;
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

!localStorage.getItem("productos") &&
  localStorage.setItem("productos", JSON.stringify(productos));

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

  // bloqueNuevo.innerHTML = `<label for="prod${producto.id}" id="prod${producto.id}-label">${producto.nombre}  $${producto.precio}</label>
  //   <input type="number" name="prod${producto.id}" id="prod${producto.id}-input"/>`;
  bloqueNuevo.appendChild(labelNuevo);
  bloqueNuevo.appendChild(inputNuevo);
  bloqueNuevo.appendChild(pNuevo);
  contenedorStock.appendChild(bloqueNuevo);
}

// Función que toma los inputs, multiplica el precio de cada producto por la cantidad ingresada y retorna el total
function calcular() {
  total = 0;
  for (let i = 0; i < productos.length; i++) {
    let numero = parseInt(document.querySelector(`#prod${i + 1}-input`).value);
    if (numero >= 0) {
      total += numero * productos[i].precio;
      productos[i].stock -= numero;
      document.querySelector(`#stockValor${i + 1}`).innerText -= numero;
    }
  }
  let elementoTotal = document.querySelector("#total");
  elementoTotal.innerText = `Total $${total}`;
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para guardar el stock de cada producto en el array -productos- y pasarlos al HTML
function guardarStock() {
  productos.forEach((elemento, i) => {
    let producto = productos[i];
    producto.stock = document.querySelector(`#stock${i + 1}-input`).value;
    producto.stock != "" &&
      (document.querySelector(`#stockValor${i + 1}`).innerText =
        producto.stock);
  });

  localStorage.setItem("productos", JSON.stringify(productos)); // para guardar el stock en localStorage
}

function cargarStock() {
  let listaProductos = JSON.parse(localStorage.getItem("productos"));
  productos.forEach(
    (elemento, i) => (productos[i].stock = listaProductos[i].stock)
  );

  for (let i = 0; i < listaProductos.length; i++) {
    let cantidad = listaProductos[i].stock;
    let valor = document.querySelector(`#stockValor${i + 1}`);
    valor.innerHTML = cantidad;
  }
}

// Declaración del contenedor donde se insertan los productos
const contenedor = document.querySelector("#lista-productos");
const contenedorStock = document.querySelector("#lista-stock");

// Iteración para la inserción del código HTML correspondiente a cada producto
productos.forEach((producto) => instertarHTMLDeProductos(producto));
liTotal();

productos.forEach((producto) => insertarHTMLStock(producto));

// Eventos
const botonCalcular = document.querySelector("#btn-calcular");
botonCalcular.addEventListener("click", calcular);

const botonGuardarStock = document.querySelector("#btn-guardar-stock");
botonGuardarStock.addEventListener("click", guardarStock);

const botonCargarStock = document.querySelector("#btn-cargar-stock");
botonCargarStock.addEventListener("click", () => {
  let listaProductos = JSON.parse(localStorage.getItem("productos"));

  listaProductos[0].stock == undefined
    ? alert("No hay ningún stock guardado")
    : cargarStock();
});
