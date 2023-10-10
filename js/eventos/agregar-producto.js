class ProductoNuevo{
  constructor(id, nombre, precio){
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.stock = 0
  }
}

function crearId(array){
    let idValida = false
    let id = 1
    while(!idValida){
      let contador = 0
      array.forEach((elemento, i)=>{
        if(id == array[i].id){
          console.log("ID ya existente");
          id++
          contador++
        }
      })
      if(contador == 0){
        idValida=true
      }
    }
    console.log(id);
    return id
  }


  function eventoCrearProducto(array){
      
      let id = crearId(array)
      let productoNuevo = new ProductoNuevo(id)
      array.push(productoNuevo)
      console.log(productoNuevo);
      
      let li = document.createElement("li")
      li.classList.add(
          "justify-content-between",
          "align-items-center",
          "list-group-item"
          );
          let inputNombre = document.createElement("input")
          inputNombre.setAttribute("id", `prod${productoNuevo.id}-nombre`)
          let inputPrecio = document.createElement("input")
          inputPrecio.setAttribute("type", "number")
          inputPrecio.setAttribute("id", `prod${productoNuevo.id}-precio`)
          let button = document.createElement("button");
          button.classList.add("btn", "btn-quitar", "text-danger");
          
          button.addEventListener("click", ()=>{
              button.parentElement.remove()
            }
)
let icon = document.createElement("i");
icon.classList.add("bi", "bi-dash-circle-fill");

button.append(icon)

li.append(inputNombre, inputPrecio, button)
document.querySelector("#lista-editar-productos").appendChild(li)
}

export default eventoCrearProducto