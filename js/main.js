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

// Ciclo para insertar código HTML por cada producto en el array Productos
const contenedor = document.querySelector("#form-productos");
for (let index = 0; index < productos.length; index++) {
  let bloqueNuevo = document.createElement("div");
  bloqueNuevo.innerHTML = `<label for="prod${index}" id="prod${index}-label">${productos[index].nombre}  $${productos[index].precio}</label>
  <input type="number" name="prod${index}" id="prod${index}-input" />`;
  contenedor.appendChild(bloqueNuevo);
}
let botonCalcular = document.querySelector("#btn-calcular");
botonCalcular.addEventListener("click", calcular);

function calcular() {
  total = 0;
  for (let i = 0; i < productos.length; i++) {
    let numero = parseInt(document.querySelector(`#prod${i}-input`).value);
    numero >= 0 && (total += numero * productos[i].precio);
    console.log(total);
  }
  alert(total);
}
