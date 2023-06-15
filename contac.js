
class Mensaje {
    constructor (nombreContacto, emailContacto, comentarios){
        this.nombreContacto = nombreContacto;
        this.emailContacto = emailContacto;
        this.comentarios = comentarios;
    }
}

const mensajes = [];

const clientes = JSON.parse(localStorage.getItem('clientes'));

const botonContacto = document.getElementById('botonContacto');

botonContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    guardarMensaje();
});

function guardarMensaje () {
    const nombreContacto = document.getElementById("nombreContacto").value;
    const emailContacto = document.getElementById("emailContacto").value;
    const comentarios = document.getElementById("comentarios").value;
    const nuevoMensaje = new Mensaje (nombreContacto,emailContacto,comentarios);
    mensajes.push(nuevoMensaje);
    sessionStorage.setItem('mensajes',JSON.stringify(nuevoMensaje))
    botonContacto.reset();
    let enviado = document.getElementById('nada');
    enviado.innerText=`Enviado`;
}

const boton = document.getElementById("formularioBoton");


boton.addEventListener('submit', (e) => {
    e.preventDefault();
    buscarDni();
});


let validar = JSON.parse(sessionStorage.getItem('dnis'));
if (validar === true) {
    boton.remove();
    let bienvenida = document.getElementById('bienvenida');
    let datos = JSON.parse(sessionStorage.getItem('datosDniEncontrado'));
    let cliente = JSON.parse(localStorage.getItem('clientes'))
    let nombrePersona = JSON.parse(sessionStorage.getItem('nombrePersona'))
    if (nombrePersona === null){
        bienvenida.innerHTML=`<h5>Hola ${datos.nombre}</h5>`;
        console.log(cliente);
    }
    else{
    bienvenida.innerHTML=`<h5>Hola ${nombrePersona}</h5>`;
    console.log(cliente);
}
}
else if (validar === false){
    boton.remove();
    let registro = document.getElementById('registro');
    registro.innerHTML=`<a class="btn btn-dark" href="./clientes.html" role="button">Registrate</a>
    `;

};

function buscarDni (){
    const numero = document.getElementById('dniControl').value;
    const encontrados = clientes.some (item => item.dni.includes(numero));
    if (encontrados === true){
        sessionStorage.setItem('dnis', JSON.stringify(encontrados));
        const datos = clientes.find(item=> item.dni.includes(numero));
        sessionStorage.setItem('datosDniEncontrado', JSON.stringify(datos));
        boton.reset();
    }
    else {
        sessionStorage.setItem('dnis', JSON.stringify(encontrados));
        alert ("Cliente no encontrado");
    }

}

// -------------carrito---------------

const verCarrito = document.getElementById('verCarrito');
let carrito = JSON.parse(sessionStorage.getItem('chequeo'));
if (carrito === null){
  carrito = [];
}else{
  actualizarCarrito();
}

let mostrarPedido = document.getElementById('mostrarPedido');



function actualizarCarrito() {
  let aux = '<h3 class="dropdown-header-title font-weight-bold">Carrito de Compras</h3>';
  carrito.forEach((producto) => {
    aux += `  
              <div class="card col-sm-9 d-flex">
                  <img src="../img/${producto.id}.png" class="card-img-top img-fluid py-3">
                  <div class="card-body justify-content-center">
                      <h4 class="card-title"> ${producto.nombre} </h4>
                      <p class="card-title"> Cantidad: ${producto.cantidad} </p>
                      <p class="card-text"> Precio: $${producto.precio} </p>
                      <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
                  </div>
              </div>
              
              `;
  });
  const total = JSON.parse(sessionStorage.getItem('total'));
  verCarrito.innerHTML = `${aux} 
  '<h3 class="dropdown-header-title font-weight-bold">Total del carrito :$${total}</h3>;
  <a class="btn btn-gradient-1" href="./checkout.html" role="button">Finalizá tu compra</a>`
}

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  carrito.splice(carrito.indexOf(producto), 1);
  actualizarCarrito();
};


