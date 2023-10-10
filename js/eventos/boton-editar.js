import insertarProductos from "../funciones/insertar-productos.js";
import insertarEditarProductos from "../funciones/editar-productos.js";
import insertarHTMLStock from "../funciones/insertar-stock.js";

function eventoBotonEditar(array){

    array.forEach((element, i) => {
        let nombre = document.querySelector(`#prod${array[i].id}-nombre`).value;
        let precio = document.querySelector(`#prod${array[i].id}-precio`).value;
        console.log(nombre, precio);
        if (array[i].nombre != nombre) {
            // Validación para aplicar cambios solo a valores distintos para no perder stock previo
            array[i].nombre = nombre;
            if(!array[i].stock)
            array[i].stock = 0;
    }
    array[i].precio != precio && (array[i].precio = precio);
  localStorage.setItem("productos", JSON.stringify(array));

});

setTimeout(() => {
    document.querySelector("#lista-productos").innerHTML = ""; // Para actualizar la lista de productos
  insertarProductos(array)
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
      array.forEach((producto) => insertarEditarProductos(producto));
      
      document.querySelector("#lista-stock").innerHTML = "";
      array.forEach((producto) => insertarHTMLStock(producto)); //Para actualizar la lista del stock
      for (let i = 0; i < array.length; i++) {
          let cantidad = array[i].stock;
          let valor = document.querySelector(`#stockValor${array[i].id}`);
          valor.innerHTML = cantidad;
  }
}, 500);
localStorage.setItem("productos", JSON.stringify(array));
}

export default eventoBotonEditar

