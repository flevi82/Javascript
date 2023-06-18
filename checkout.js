let bienvenida = document.getElementById('bienvenida');
let mostrarPedido = document.getElementById('mostrarPedido');
let mostrarCliente = document.getElementById('mostrarCliente');
let mostrarTotal = document.getElementById('mostrarTotal');
let clientes = JSON.parse(sessionStorage.getItem('datosDniEncontrado'));
let cliente = JSON.parse(sessionStorage.getItem('clientes'));
if (clientes === null){
    let nombrePersona = "Visitante";
    bienvenida.innerHTML=`<h5>Hola ${nombrePersona}</h5>`;
    mostrarCliente.innerHTML=`<h5>Datos del Cliente: No registrado`
}else{
    let nombrePersona = clientes.nombre;
    bienvenida.innerHTML=`<h5>Hola ${nombrePersona}</h5>`
    mostrarCliente.innerHTML=`<h3>Datos del Pedido:</h3><br>
    <h4>Datos del cliente:</h4>
    <h5>Nombre: ${clientes.nombre}<br>
    Apellido: ${clientes.apellido}</h5><br><br>
    <h4>Detalle del pedido:</h4>`;
}
const total = JSON.parse(sessionStorage.getItem('total'));
const carrito = JSON.parse(sessionStorage.getItem('chequeo'));



function mostrarCompra (){
let aux = '';
carrito.forEach((producto) => {
    aux +=  ` 
              <div class="card col-sm-9 d-flex">
                  <div class="card-body justify-content-center">
                      <h4 class="card-text"> ${producto.nombre} </h4>
                      <p class="card-title"> Cantidad: ${producto.cantidad} </p>
                      <p class="card-text"> Total: $${producto.precio} </p>
                  </div>
              </div> `;
  });

  mostrarPedido.innerHTML = `${aux}</h5><br><br>
  <h4> Total del pedido: $${total}</h4>`;

}

mostrarCompra();



