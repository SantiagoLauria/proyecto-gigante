// Declaración del contenedor donde se insertan los productos
const contenedorStock = document.querySelector("#lista-stock");

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

export default insertarHTMLStock