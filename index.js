const cartas = document.querySelectorAll(".memoria-card");
console.log(cartas);
const botonReset = document.querySelector("#empezar");

let tableroBloqueado = false;
let arrancaste = false;
let primeraCarta, segundaCarta;
let movimientosRestantes = 12;
let aciertos = 0;

mostrarMovimientos();

function girar() {

  console.log(aciertos);

  if (tableroBloqueado) return;

  if (movimientosRestantes === 0) {
    alert("Lola-mento... perdiste perri!");
    mostrarTodasLasCartas();
  };

  // Si la primera carta, es igual a la que estoy apretando (segunda), que salga de la funcion
  // Puedo saber cual es la segunda carta aunque todavía no la haya guardado
  if (this === primeraCarta) return;

  this.classList.add("girar");

  if (!arrancaste) {
    arrancaste = true;
    primeraCarta = this;

    return;
  }

  arrancaste = false;
  segundaCarta = this;

  comprobarCoincidencia();

  
}

// Funcion para reseTEAR LAS BAREAVLES

function resetearBareavle() {
  primeraCarta = null;
  segundaCarta = null;
  // tableroBloqueado = false;
  // arrancaste = false;
}

function comprobarCoincidencia() {
  let coincidencia =
    primeraCarta.dataset.participante === segundaCarta.dataset.participante;

  coincidencia ? deshabilitarCartas() : devolverCartas();
}

function deshabilitarCartas() {
  primeraCarta.removeEventListener("click", girar);
  segundaCarta.removeEventListener("click", girar);
  resetearBareavle();
  aciertos = aciertos + 2;
    //Mostrar texto felicitaciones
if (aciertos > 11) {
  document.getElementById('felicitaciones').innerHTML = "Ganaste Perri... Felicitaciones";
};
}

function devolverCartas() {
  tableroBloqueado = true;
  setTimeout(() => {
    primeraCarta.classList.remove("girar");
    segundaCarta.classList.remove("girar");
    tableroBloqueado = false;
    resetearBareavle();
    movimientosRestantes --;
    mostrarMovimientos();
  }, 700);
}

function cartasClickeables() {
  cartas.forEach((carta) => carta.addEventListener("click", girar));
  mezclarCartas();
}

cartasClickeables();

// Funcion para mostrar en HTML los movimientos restantes
function mostrarMovimientos() {
  document.getElementById('movimientos').innerHTML = movimientosRestantes;
};

// Funcion para mostrar todas las cartas
function mostrarTodasLasCartas() {
  cartas.forEach((carta) => carta.classList.add("girar"));
};

// Hacer el random

function mezclarCartas() {
  // Recorrer todas las cartas
  // Por cada carta:
  // Quiero generar un numero random
  // Y aplicarselo al style.order

  cartas.forEach((carta) => {
    let numeritoRandomico = Math.floor(Math.random() * 12);
    carta.style.order = numeritoRandomico;
  });
}



// Funcion para resetear el juego 
function resetearAlInicio() {
  cartas.forEach((carta) => carta.classList.remove("girar"));
  cartasClickeables();
  movimientosRestantes = 12;
  aciertos = 0;
  mostrarMovimientos();
  resetearBareavle();
};

botonReset.addEventListener("click", function(){
  if (movimientosRestantes >= 1) {
    mostrarTodasLasCartas();
    setTimeout(() => {
      resetearAlInicio();
    }, 4000);
  } else {
    resetearAlInicio();
  }
});
// TAREA
// leer que es this en los addEventListener
// Agregarle algun boton de Reset (dar vuelta todas las cartas, volver a mezclarlas, volver a agregarle los event listener... todo de nuevo)
// Contador de movimientos || un limite de movimientos (maximo de 12 movimientos y por cada !acierto, que reste uno, y cuando llega a 0, chau picho)
// Algun innerHtml que me diga: ganasTE PERRRIIIIIIIIIIII

// Sacado de contexto (miren la clase para entender xD)
// piedra = 0
// papel = 2
// tijera = 1

// const array = [[empato, gano, perdio], [gano, empato, perdio], [perdio, gano, empato]]

// array[0][1] = gano
