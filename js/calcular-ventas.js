import sweetAlert from "./sweet-alert.js";
// Función que toma los inputs, multiplica el precio de cada producto por la cantidad ingresada y retorna el total
function calcular(array) {
    total = 0;
    let todoBien = true;
    array.forEach((element, i) => {
      let numero = parseInt(document.querySelector(`#prod${array[i].id}-input`).value);
      let stock = document.querySelector(`#stockValor${array[i].id}`).innerText;
  
      //  Validación de que lo vendido sea menor al stock
      if (numero < 0 || numero > stock) {
        todoBien = false;
      }
    });
  
    if (todoBien) {
      array.forEach((element, i) => {
        let numero = parseInt(
          document.querySelector(`#prod${array[i].id}-input`).value
        );
        if (Number.isInteger(numero)) {
          total += numero * array[i].precio;
          array[i].stock -= numero;
          document.querySelector(`#stockValor${array[i].id}`).innerText -= numero;
          document.querySelector(`#prod${array[i].id}-input`).value = "";
        }
      });
      sweetAlert("success", "Calculado y restado del stock con éxito");
    } else {
      sweetAlert(
        "error",
        "Revisa las cantidades ingresadas e inténtalo nuevamente"
      );
    }
  
    let elementoTotal = document.querySelector("#total");
    elementoTotal.innerText = `Total $${total}`;
    localStorage.setItem("productos", JSON.stringify(array));
  }

  export default calcular


