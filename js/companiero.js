import random from "./numeros-aleatorios.js";

let pokemon;
let numeroRandom;

function fetchCompaniero() {
    if (!localStorage.getItem("pokemon")) {
      localStorage.setItem("pokemon", `${random()}`);
    }
    numeroRandom = localStorage.getItem("pokemon");
    fetch(`https://pokeapi.co/api/v2/pokemon/${numeroRandom}/`)
      .then((resp) => resp.json())
      .then((data) => {
        pokemon = data;
        mostrarCompaniero(pokemon);
      });
  }
  // Funcion para insertar el compañero
  function mostrarCompaniero(pokemon) {
    const contenedor = document.querySelector("#companiero");
  
    let div = document.createElement("div");
  
    let p = document.createElement("p"); // Nombre
    p.classList.add("m-0");
    p.innerText = `${pokemon.name} te saluda!`;
  
    let img = document.createElement("img"); // Sprite del pkm
    img.setAttribute("src", pokemon.sprites.front_default);
  
    let botonBorrar = document.createElement("button"); // Botón con ícono
    botonBorrar.classList.add("btn");
    botonBorrar.setAttribute("id", "btn-companiero");
    let i = document.createElement("i");
    i.classList.add("bi", "bi-x-circle", "text-light");
    botonBorrar.appendChild(i);
  
    let botonRegenerar = document.createElement("button");
    botonRegenerar.classList.add("btn");
    botonRegenerar.setAttribute("id", "btn-regenerar");
    i = document.createElement("i");
    i.classList.add("bi", "bi-arrow-repeat", "text-light");
    botonRegenerar.appendChild(i);
  
    div.appendChild(botonRegenerar);
    div.appendChild(botonBorrar);
    contenedor.append(div, img, p);
  
    // Evento del botón de borrar
    const btnBorrar = document.querySelector("#btn-companiero");
    btnBorrar.addEventListener("click", () => {
      let elemento = document.querySelector("#companiero");
      elemento.remove();
    });
    // Evento del boton regenerar
    const btnRegenerar = document.querySelector("#btn-regenerar");
    btnRegenerar.addEventListener("click", () => {
      localStorage.removeItem("pokemon");
      while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
      }
      fetchCompaniero();
    });
}

export default fetchCompaniero