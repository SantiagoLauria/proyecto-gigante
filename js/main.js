let total = 0;
// Lista de productos
const productos = [
  { id: 1, nombre: "Heineken", precio: 1500 },
  { id: 2, nombre: "Miller", precio: 1300 },
  { id: 3, nombre: "Santa Fe Pilsen", precio: 1000 },
  { id: 4, nombre: "Gaseosa 1,5L", precio: 900 },
  { id: 5, nombre: "Aquarius 1,5L", precio: 700 },
  { id: 6, nombre: "Powerade 500ml", precio: 500 },
  { id: 7, nombre: "Monster Energy", precio: 700 },
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

  // bloqueNuevo.innerHTML = `<label for="prod${producto.id}" id="prod${producto.id}-label">${producto.nombre}  $${producto.precio}</label>
  //   <input type="number" name="prod${producto.id}" id="prod${producto.id}-input"/>`;
  bloqueNuevo.appendChild(labelNuevo);
  bloqueNuevo.appendChild(inputNuevo);
  console.log(inputNuevo);
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
  console.log(bloqueNuevo);
  contenedor.appendChild(bloqueNuevo);
}
// Función que toma los inputs, multiplica el precio de cada producto por la cantidad ingresada y retorna el total
function calcular() {
  total = 0;
  for (let i = 0; i < productos.length; i++) {
    let numero = parseInt(document.querySelector(`#prod${i + 1}-input`).value);
    numero >= 0 && (total += numero * productos[i].precio);
    console.log(total);
  }
  let elementoTotal = document.querySelector("#total");
  elementoTotal.innerText = `Total $${total}`;
}

// Declaración del contenedor donde se insertan los productos
const contenedor = document.querySelector("#lista-productos");

// Iteración para la inserción del código HTML correspondiente a cada producto
productos.forEach((producto) => instertarHTMLDeProductos(producto));
liTotal();

let botonCalcular = document.querySelector("#btn-calcular");
botonCalcular.addEventListener("click", calcular);
