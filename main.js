

let clientes;
fetch ("./data.json")
  .then((response) => response.json())
  .then((data) => {clientes = data
    sessionStorage.setItem('clientes', JSON.stringify(clientes));
  });


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
    let cliente = JSON.parse(sessionStorage.getItem('clientes'));
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
const salir = () => {
  salida.remove();
  sessionStorage.removeItem('dnis');
  sessionStorage.removeItem('datosDniEncontrados');
  location.reload();
}

const salida = document.getElementById("salida");
salida.addEventListener('click', () => {
  salir();
});


class Producto{
    constructor (id,nombre,precio,tematica,cantidad){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.tematica = tematica;
        this.cantidad = cantidad;
    }
}

const prod1 = new Producto (1,"Set Figuras", 1000, "Semántica",1);
const prod2 = new Producto (2,"La mudanza", 2000, "Semantica",1);
const prod3 = new Producto (3,"Morfosintático Select", 3000, "Morfosintaxis",1);
const prod4 = new Producto (4,"Kit Morfosintáctico", 4000, "Morfosintaxis",1);

const productos = [prod1,prod2,prod3,prod4];


const carri1 = document.getElementById('carri1');
carri1.addEventListener('click', () => {
    agregarAlCarrito(prod1.id);
  });
const carri2 = document.getElementById('carri2');
carri2.addEventListener('click', () => {
    agregarAlCarrito(prod2.id);
  });
const carri3 = document.getElementById('carri3');
carri3.addEventListener('click', () => {
    agregarAlCarrito(prod3.id);
  });
const carri4 = document.getElementById('carri4');
carri4.addEventListener('click', () => {
    agregarAlCarrito(prod4.id);
  });

class Carrito{
    constructor (nroPedido, descripcion,  envio, total){
        this.nroPedido = nroPedido;
        this.descripcion = descripcion;
        this.envio = envio;
        this.total = total;
    }
}

const calcularTotalCompra = () => {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });

  sessionStorage.setItem('total',JSON.stringify(total));
};

const verCarrito = document.getElementById('verCarrito');
let carrito = JSON.parse(sessionStorage.getItem('chequeo'));
if (carrito === null){
  carrito = [];
  
}else{
  carrito = JSON.parse(sessionStorage.getItem('chequeo'));
}

const agregarAlCarrito = (id) => {
  const producto = productos.find((prod) => prod.id === id);
  const productoEnCarrito = carrito.find((prod) => prod.id === id);
    if (productoEnCarrito) {
      producto.cantidad++;
    } else {
      carrito.push(producto);
    }
  actualizarCarrito();
  sessionStorage.setItem("chequeo",JSON.stringify(carrito))
  };

 


function actualizarCarrito() {
  
  if (carrito.length < 1){
    verCarrito.innerHTML = `<h2 class="dropdown-header font-weight-bold">El carrito está vació</h2>`
  }
  else{
  let aux = '<h3 class="dropdown-header-title font-weight-bold">Carrito de Compras</h3>';
  carrito.forEach((producto) => {
    aux += `  
          <div class="card col-sm-9 d-flex">
            <img src="img/${producto.id}.png" class="card-img img-fluid py-3">
            <div class="card-body justify-content-center">
              <h4 class="card-title"> ${producto.nombre} </h4>
              <p class="card-title"> Cantidad: ${producto.cantidad} </p>
              <p class="card-text"> Precio: $${producto.precio} </p>
              <p class="card-text"> ID: ${producto.id} </p>
              <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
            </div>
          </div>`;
  });

  calcularTotalCompra();
  const total = JSON.parse(sessionStorage.getItem('total'));
  verCarrito.innerHTML = `${aux}<br>
  <h3 class="dropdown-header-title font-weight-bold">Total del carrito :$${total}</h3>
  <a class="btn btn-gradient-1 d-flex justify-content-center" href="./pages/checkout.html" role="button">Finalizá tu compra</a><br>`   
  sessionStorage.setItem("chequeo",JSON.stringify(carrito));
  cambioCarrito();
}
}


const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  if (producto.cantidad > 1){
    producto.cantidad--;
  }else{
    carrito.splice(carrito.indexOf(producto), 1);
  }
  calcularTotalCompra();
  actualizarCarrito();
  sessionStorage.setItem("chequeo",JSON.stringify(carrito))
};









