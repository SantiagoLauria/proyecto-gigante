import fetchCompaniero from "./companiero.js";

import insertarEditarProductos from "./editar-productos.js";
import insertarProductos from "./insertar-productos.js";
import insertarHTMLStock from "./insertar-stock.js";

import calcular from "./calcular-ventas.js";

import sweetAlert from "./sweet-alert.js";

import eventoBotonEditar from "./eventos/boton-editar.js";
import eventoCrearProducto from "./eventos/agregar-producto.js";




setTimeout(() => {
  fetchCompaniero();
}, 500);

// Lista de productos

const productos = [];

// Para insertar en el HTML los elementos para editar
setTimeout(() => {
  productos.forEach((producto) => insertarEditarProductos(producto));
}); 
const botonEditar = document.querySelector("#btn-editar-guardar"); // Y asignarle el evento para guardar los cambios
botonEditar.addEventListener("click", () => {eventoBotonEditar(productos)});


// Función para cargar productos desde localStorage
function cargarProductos() {
  let productosGuardados = JSON.parse(localStorage.getItem("productos"))
  console.log(productosGuardados);
  productosGuardados.forEach((elemento, i) => {
      productos[i] = productosGuardados[i];
    });

    sweetAlert("success", "Stock cargado con éxito");
  } 

// Promesa y función asíncrona para cargar productos de localStorage y stock
if(localStorage.getItem("productos")){
  cargarProductos()
} else {sweetAlert("warning", "No hay ningún stock guardado")}

setTimeout(() => {
  productos.forEach((producto) => insertarHTMLStock(producto));
  for (let i = 0; i < productos.length; i++) {
    let cantidad = productos[i].stock;
    let valor = document.querySelector(`#stockValor${productos[i].id}`);
    valor.innerHTML = cantidad;
  }
}, 0);


// Iteración para la inserción del código HTML correspondiente a cada producto
setTimeout(() => {
  insertarProductos(productos)
}, 0);

// Eventos
const botonCalcular = document.querySelector("#btn-calcular");
botonCalcular.addEventListener("click", () => {
  calcular(productos);
});

// Evento y función de guardar stock
const botonGuardarStock = document.querySelector("#btn-guardar-stock");
botonGuardarStock.addEventListener("click", () => {
  let contador = 0;
  productos.forEach((elemento, i) => {
    let producto = productos[i];
    let nuevoValor = document.querySelector(`#stock${productos[i].id}-input`).value;

    // Validación de los datos ingresados para el stock
    if (nuevoValor != "" && nuevoValor > 0) {
      producto.stock = nuevoValor;
      document.querySelector(`#stockValor${productos[i].id}`).innerText = producto.stock;
      document.querySelector(`#stock${productos[i].id}-input`).value = "";
    } else if (nuevoValor < 0) {
      contador++;
      document.querySelector(`#stock${productos[i].id}-input`).value = "";
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
      
      // Evento para quitar productos del array y del html
      setTimeout(()=>{
        for (let i = 0; i < productos.length; i++) {
          const element = productos[i];
          let botonQuitar = document.querySelector(`#btn-quitar${productos[i].id}`)
          botonQuitar.addEventListener("click", ()=> {
      productos.splice(i, 1)
      botonQuitar.parentElement.remove()
      console.log(productos);
      
    })}
    localStorage.setItem("productos", JSON.stringify(productos))
  }, 500)

  // Evento para agregar un producto
  const botonAgregarProducto = document.querySelector("#btn-agregar")
  botonAgregarProducto.addEventListener("click", ()=>{
    eventoCrearProducto(productos)
  })