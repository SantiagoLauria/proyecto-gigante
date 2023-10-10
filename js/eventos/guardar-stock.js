import sweetAlert from "../funciones/sweet-alert.js";

function eventoGuardarStock(array){
    
    let contador = 0;
  array.forEach((elemento, i) => {
    let producto = array[i];
    let nuevoValor = document.querySelector(`#stock${array[i].id}-input`).value;

    // Validación de los datos ingresados para el stock
    if (nuevoValor != "" && nuevoValor > 0) {
      producto.stock = nuevoValor;
      document.querySelector(`#stockValor${array[i].id}`).innerText = producto.stock;
      document.querySelector(`#stock${array[i].id}-input`).value = "";
    } else if (nuevoValor < 0) {
      contador++;
      document.querySelector(`#stock${array[i].id}-input`).value = "";
    }
  });

  contador > 0
  ? sweetAlert(
    "warning",
        "Alguno de los valores ingresados no son válidos\nEl resto se guardó con éxito"
        )
        : sweetAlert("success", "Stock guardado con éxito");
        localStorage.setItem("productos", JSON.stringify(array)); // para guardar el stock en localStorage
      }

    export default eventoGuardarStock
    