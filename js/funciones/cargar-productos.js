import sweetAlert from "./sweet-alert.js";
// Función para cargar productos desde localStorage
function cargarProductos(array) {
    let productosGuardados = JSON.parse(localStorage.getItem("productos"))
    console.log(productosGuardados);
    productosGuardados.forEach((elemento, i) => {
        array[i] = productosGuardados[i];
      });
  
      sweetAlert("success", "Stock cargado con éxito");
    } 

    export default cargarProductos