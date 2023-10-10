let total = 0;

function insertarProductos(array){
  array.forEach((producto) => insertarHTMLDeProductos(producto));
  liTotal()
}

// Declaración del contenedor donde se insertan los productos
const contenedor = document.querySelector("#lista-productos");

// Función para insertar código HTML de cada producto
function insertarHTMLDeProductos(producto) {
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


  export default insertarProductos
