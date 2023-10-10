function insertarEditarProductos(producto) {
    let li = document.createElement("li");
    li.classList.add(
      "justify-content-between",
      "align-items-center",
      "list-group-item"
    );
    li.setAttribute("id", `editar-prod${producto.id}`)
    let inputNombre = document.createElement("input");
    inputNombre.setAttribute("id", `prod${producto.id}-nombre`);
    inputNombre.setAttribute("value", `${producto.nombre}`);
  
    let inputPrecio = document.createElement("input");
    inputPrecio.setAttribute("id", `prod${producto.id}-precio`);
    inputPrecio.setAttribute("value", `${producto.precio}`);
    inputPrecio.setAttribute("type", "number")
  
    let button = document.createElement("button");
    button.classList.add("btn", "btn-quitar", "text-danger");
    button.setAttribute("id", `btn-quitar${producto.id}`);
    let icon = document.createElement("i");
    icon.classList.add("bi", "bi-dash-circle-fill");
  
    button.append(icon);
  
    li.append(inputNombre, inputPrecio, button);
  
    document.querySelector("#lista-editar-productos").append(li);
  }

  export default insertarEditarProductos