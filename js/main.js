import fetchCompaniero from "./funciones/companiero.js";

import insertarEditarProductos from "./funciones/editar-productos.js";
import insertarProductos from "./funciones/insertar-productos.js";
import insertarHTMLStock from "./funciones/insertar-stock.js";

import cargarProductos from "./funciones/cargar-productos.js";
import calcular from "./funciones/calcular-ventas.js";

import sweetAlert from "./funciones/sweet-alert.js";

import eventoBotonEditar from "./eventos/boton-editar.js";
import eventoCrearProducto from "./eventos/agregar-producto.js";
import eventoGuardarStock from "./eventos/guardar-stock.js";

setTimeout(() => {
  fetchCompaniero();
}, 500);

// Lista de productos

const productos = [];

// Promesa y función asíncrona para cargar productos de localStorage y stock
if (localStorage.getItem("productos")) {
  cargarProductos(productos);
} else {
  sweetAlert("warning", "No hay ningún stock guardado");
}


// Para insertar en el HTML los elementos para editar
setTimeout(() => {
  productos.forEach((producto) => insertarEditarProductos(producto));
});
const botonEditar = document.querySelector("#btn-editar-guardar"); // Y asignarle el evento para guardar los cambios
botonEditar.addEventListener("click", () => {
  eventoBotonEditar(productos);
});


setTimeout(() => {
  productos.forEach((producto) => insertarHTMLStock(producto));
  for (let i = 0; i < productos.length; i++) {
    let cantidad = productos[i].stock;
    let valor = document.querySelector(`#stockValor${productos[i].id}`);
    valor.innerHTML = cantidad;
  }
}, 0);

// Inserción del código HTML correspondiente a cada producto
setTimeout(() => {
  insertarProductos(productos);
}, 0);

// Eventos
const botonCalcular = document.querySelector("#btn-calcular");
botonCalcular.addEventListener("click", () => {
  calcular(productos);
});

// Evento y función de guardar stock
const botonGuardarStock = document.querySelector("#btn-guardar-stock");
botonGuardarStock.addEventListener("click", () => {
  eventoGuardarStock(productos);
});

// Evento para agregar un producto
const botonAgregarProducto = document.querySelector("#btn-agregar");
botonAgregarProducto.addEventListener("click", () => {
  eventoCrearProducto(productos);
});

// Evento para quitar productos del array y del html
setTimeout(() => {
  for (let i = 0; i < productos.length; i++) {
    const element = productos[i];
    let botonQuitar = document.querySelector(`#btn-quitar${productos[i].id}`);
    botonQuitar.addEventListener("click", () => {
      productos.splice(i, 1);
      botonQuitar.parentElement.remove();
      console.log(productos);
    });
  }
  localStorage.setItem("productos", JSON.stringify(productos));
}, 500);

