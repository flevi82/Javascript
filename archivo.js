class Producto{
    constructor (nombre,precio,tematica){
        this.nombre = nombre;
        this.precio = precio;
        this.tematica = tematica;
    }
}

class Cliente{
    constructor (nombre,apellido,dni, direccion){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.direccion = direccion;
    }
}

class Carrito{
    constructor (nroPedido, descripcion, cliente, envio, total){
        this.nroPedido = nroPedido;
        this.descripcion = descripcion;
        this.cliente = cliente;
        this.envio = envio;
        this.total = total;
    }
}

function procesoInicial (){
    respuestaProceso = prompt (`Bienvenido a Fonología Juegos. Seleccione una opción:
    
    [1]Ingresar
    [2]Verificar pedido con número
    [3]Consultar productos por nombre o temática
    [4]Salir`);
        switch(respuestaProceso){
            case "1":
                nuevoCliente();
                break;
            case "2":
                buscarPedido();
                break;
            case "3":
                buscarProducto();
                break;
            case "4":
                break;
            default:
                alert ("Respuesta inválida");
        }
}

function procesoSecundario(){
    procesoDecompra = prompt (`Seleccione una opción:
    [1]Realizar una compra
    [2]Consultar productos por nombre o temática
    [3]volver`);
        switch(procesoDecompra){
            case "1":
                nuevoPedido ();
                break;
            case "2":
                buscarProducto();
                break;
            case "3":
                procesoInicial();
                break;
            default:
                alert ("Respuesta inválida")
        }

}



function buscarPedido (){
    let nroPedido = prompt ("Ingrese su número de pedido");
    const pedidoEncontrado = arrayCarrito.find((item) => item.nroPedido == nroPedido);

    if (pedidoEncontrado){
        let mensaje = `Tu pedido incluye ${pedidoEncontrado.descripcion} y el total es ${pedidoEncontrado.total}.`;
        alert (mensaje);
    }
    else{
        alert ("Pedido no encontrado");
    }
}

const arrayClientes = [
    {nombre: "Martin",apellido: "Guzman",dni:"11.111.111"},
    {nombre: "Sergio",apellido: "Massa", dni:"22.222.222"},
    {nombre: "Silvina",apellido: "Batakis", dni:"33.333.333"},
    {nombre: "Daniel",apellido: "Scioli", dni:"44.444.444"},
];
function nuevoCliente (){
    let dni = prompt("Ingrese su DNI");
    if (validarNuevoCliente(dni)){   
    }else{
    let nombre = prompt("Ingrese su nombre");
    let apellido = prompt ("Ingrese su apellido");
    let direccion = prompt ("Ingrese su direccion");
    nombreApellido = nombre + " " + apellido;
    const clientes = new Cliente (nombre, apellido, dni, direccion);
    arrayClientes.push(clientes);
    console.log(arrayClientes);
    return nombreApellido;
    }
}

function validarNuevoCliente (dni){
    
const dniEncontrado = arrayClientes.find((item) => item.dni == dni);

if (dniEncontrado) {
  let mensaje = `Cliente ya registrado, Bienvenido.
  DNI: ${dniEncontrado.dni}
  ${dniEncontrado.nombre} ${dniEncontrado.apellido}`;
  nombreApellido = dniEncontrado.nombre + " " +dniEncontrado.apellido
  alert(mensaje);
  return nombreApellido;
} 
}


const arrayCarrito = [
    {nroPedido:"1",descripcion: "1 Set Figuras",cliente:arrayClientes[0],envio:"Si", total: "3.000"},
    {nroPedido:"2",descripcion: "1 Kit Morfosintáctico",cliente:arrayClientes[2],envio:"No", total: "4.000"},
    {nroPedido:"3",descripcion: "1 La Mudanza",cliente:arrayClientes[1],envio:"Si", total: "4.000"},
];
let numeroPedido = arrayCarrito[(arrayCarrito.length-1)].nroPedido;
function armarCarrito (descripcion, cliente){
    numeroPedido =+ numeroPedido + 1;
    const carrito = new Carrito (numeroPedido,descripcion,cliente, envio ,total);
    arrayCarrito.push(carrito);
    console.log(arrayCarrito)
}

const prod1 = new Producto ("Set Figuras", 1000, "Semántica");
const prod2 = new Producto ("La mudanza", 2000, "Semantica");
const prod3 = new Producto ("Morfosintático Select", 3000, "Morfosintaxis");
const prod4 = new Producto ("Kit Morfosintáctico", 4000, "Morfosintaxis");

const arrayProductos = [
    {nombre: "Set Figuras", precio: 1000, tematica: "Semántica"},
    {nombre: "La Mudanza", precio: 2000, tematica: "Semántica"},
    {nombre: "Morfosintáctico Select", precio: 3000, tematica: "Morfosintaxis"},
    {nombre: "Kit Morfosintáctico", precio: 4000, tematica: "Morfosintaxis"},
    
];


function nuevoPedido (){
eleccion = prompt(`Elegí un producto [1] ${prod1.nombre} 
                              [2] ${prod2.nombre} 
                              [3] ${prod3.nombre} 
                              [4] ${prod4.nombre}
                              [0] salir`);
    while (eleccion !=0){
    switch (eleccion){
        case "1":
            preguntarCantidad();
            sumar(prod1);
            pedido(prod1);
            break;
            case "2":
            preguntarCantidad();
            sumar(prod2);
            pedido(prod2);
            break;
        case "3":
            preguntarCantidad();
            sumar(prod3);
            pedido(prod3);
            break;
        case "4":
            preguntarCantidad();
            sumar(prod4);
            pedido(prod4);
            break;
        default:
            alert("Introduzca un valor válido");
                                }
                            
    eleccion = prompt(`¿Querés sumar otro producto? [1] ${prod1.nombre} 
                                                    [2] ${prod2.nombre} 
                                                    [3] ${prod3.nombre} 
                                                    [4] ${prod4.nombre}
                                                    [0] No, gracias.`);
                            
                              
    envioAdomicilio();
    }
                            
}


function sumar(compra){
    total = total + (compra.precio*cantidad);
}
function pedido(nombreJuego){
    descripcion = descripcion + ", " + cantidad + " " + nombreJuego.nombre;
    
}


function preguntarCantidad(){
    cantidad = parseInt(prompt("¿Cuántas unidades querés?"));
    while (isNaN(cantidad) || cantidad < 0){
        cantidad = parseInt(prompt("Ingrese un número válido"));
    }
}


function envioAdomicilio (){
    envio = prompt (`¿Querés que te enviemos tu compra? Si es así se sumará $2.000 al total. 
[1]Si
[2]No`);
    while ((envio !="1")&&(envio!="2")){
        alert ("Ingresa un valor válido");
        envio = prompt (`¿Querés que te enviemos tu compra? Si es así se sumará $2.000 al total. 
[1]Si
[2]No`);

    }
    if (envio =="1"){
        total = total + 2000;
        envio = "Si";
    }
    else {
        envio = "No";
    }

    if (total > 0){
        alert (`Muchas gracias por tu compra. Esta incluye ${descripcion}  y el total a pagar es $${total}`);
    }
    else {
        alert ("Gracias por tu visita. Te esperamos pronto.")
    }
};

function buscarProducto(){
    let nombre = prompt ("Ingrese el tema o el nombre del juego buscado");
    const encontrados = arrayProductos.filter (item => item.tematica.includes(nombre) || item.nombre.includes(nombre));
    encontrados.forEach((item) => {
        let mensaje = `
        Nombre: ${item.nombre}
        Precio: ${item.precio}
        Temática: ${item.tematica}
  ` ;
        alert(mensaje);
    
});

    
}



let total = 0;
let cantidad = 0
let descripcion = "";
let envio = "";
let eleccion ="";
let respuestaProceso = "";
let procesoDecompra ="";
let nombreApellido = "";



procesoInicial ();
procesoSecundario ();
if (total > 0){
armarCarrito(descripcion, nombreApellido);
};



