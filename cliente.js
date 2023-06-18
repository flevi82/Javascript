
class Cliente{
    constructor (nombre,apellido,dni,email,direccion){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.direccion = direccion;
    }
}


let clientes = JSON.parse(sessionStorage.getItem('clientes'));
const formulario = document.getElementById('formulario');
const nuevosCliente = document.getElementById('nuevoCliente');

nuevosCliente.addEventListener('click', (e) => {
  e.preventDefault();
  nuevoCliente();
});


const nuevoCliente = async () => {
    let nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const clienteNuevo = new Cliente(nombre,apellido,dni,email,direccion);

    const encontrados = clientes.some (item => item.dni.includes(dni));
    const encontrados1 = clientes.find(item => item.dni.includes(dni));
    if (encontrados===true){
        alert ("Tus datos fueron registrados previamente");
        clientes.push(encontrados1);
        clientes.shift(encontrados1);
        formulario.reset();
        nombre = clientes[(clientes.length-1)].nombre
        sessionStorage.setItem('datosDniEncontrado', JSON.stringify(encontrados1));
        
    }
    else{
        clientes.push(clienteNuevo);
        console.log(clientes);
        sessionStorage.setItem('datosDniEncontrado', JSON.stringify(clientes[clientes.length-1]));
        sessionStorage.setItem('clientes', JSON.stringify(clientes));
    }

    
    sessionStorage.setItem('nombrePersona', JSON.stringify(nombre));
    sessionStorage.setItem('dnis', JSON.stringify(true));
    
    let bienvenida = document.getElementById('bienvenida');
    bienvenida.innerHTML=`<h5>Hola ${nombre}</h5>`;
    boton.remove();
    formulario.reset();
};

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
    bienvenida.innerHTML=`<h5>Hola ${datos.nombre}</h5>`;
}

function buscarDni (){
    const numero = document.getElementById('dniControl').value;
    const encontrados = clientes.some (item => item.dni.includes(numero));
    if (encontrados===true){
        sessionStorage.setItem('dnis', JSON.stringify(encontrados));
        const datos = clientes.find(item=> item.dni.includes(numero));
        sessionStorage.setItem('datosDniEncontrado', JSON.stringify(datos));
        boton.reset();
        }
    else{
        alert ("Cliente no encontrado");
    }
}


