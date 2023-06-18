
class Mensaje {
    constructor (nombreContacto, emailContacto, comentarios){
        this.nombreContacto = nombreContacto;
        this.emailContacto = emailContacto;
        this.comentarios = comentarios;
    }
}

const mensajes = [];

let clientes = JSON.parse(sessionStorage.getItem('clientes'));


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


// TRAIGO LOS BOTONES DE ACCESO Y REGISTRO
const boton = document.getElementById("formularioBoton");
const registrate = document.getElementById("registrate");

// PROGRAMACIÓN BOTÓN DE ACCESO
boton.addEventListener('click', () => {
   buscaClientes ();
});

const buscaClientes = async () => {
    const { value: numero } = await Swal.fire({
      title: 'Acceso',
      input: 'text',
      inputLabel: 'Ingresá tu DNI',
      inputPlaceholder: 'XX.XXX.XXX'
    })
    if (numero == ""){
      Swal.fire(`Ingresá un valor válido`);
    }

  // VALIDACIÓN DE CLIENTES

  const encontrados = clientes.some (item => item.dni.includes(numero));
  sessionStorage.setItem('dnis', JSON.stringify(encontrados));
  if (encontrados === true){
    const datos = clientes.find(item=> item.dni.includes(numero));
    sessionStorage.setItem('datosDniEncontrado', JSON.stringify(datos));
    Swal.fire(`Hola ${datos.nombre}`).then(function(){ 
      location.reload();
      }
   );
    }
  else {
    Swal.fire({
      icon: 'warning',
      title: '¿Quién sos?',
      text: 'Registrate así te conocemos',
      footer: '<a href="./pages/clientes.html">Ingresá tus datos aquí</a>'
      })
    }
    
}


const finalizandoCompra = document.getElementById('finalizandoCompra');
let validar = JSON.parse(sessionStorage.getItem('dnis'));
if (validar === true) {
    boton.remove();
    registrate.remove();
    let bienvenida = document.getElementById('bienvenida');
    let datos = JSON.parse(sessionStorage.getItem('datosDniEncontrado'));
    let cliente = JSON.parse(localStorage.getItem('clientes'));
    let nombrePersona = JSON.parse(sessionStorage.getItem('nombrePersona'));
    finalizandoCompra.innerHTML =  
    `<a class="btn btn-gradient-1" href="./pages/checkout.html" role="button">Finalizá tu compra</a>`
    let registro = document.getElementById('salir');
    registro.innerHTML=`<button class="btn btn-warning mr-md-3" id="salida" role="button" style="width:15vh" type="submit">Salir</button>`;
    if (nombrePersona === null){
        bienvenida.innerHTML=`<h5>Hola ${datos.nombre}</h5>`;
        console.log(cliente);
    }
    else{
    bienvenida.innerHTML=`<h5>Hola ${nombrePersona}</h5>`;
    console.log(cliente);
    }
}

// CONFIGURACIÓN DE LOG OUT
const salida = document.getElementById("salida");
salida.addEventListener('click', () => {
  salida.remove();
  sessionStorage.removeItem('dnis');
  sessionStorage.removeItem('datosDniEncontrados');
  location.reload();
});

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


