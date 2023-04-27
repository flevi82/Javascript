class Producto{
    constructor (nombre,precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

const prod1 = new Producto ("Set Figuras", 1000);
const prod2 = new Producto ("La mudanza", 2000);
const prod3 = new Producto ("Morfosintático Select", 3000);
const prod4 = new Producto ("Kit Morfosintáctico", 4000);


let total = 0;
let cantidad = 0
let descripcion = "";
let eleccion = prompt(`Elegí un producto [1] ${prod1.nombre} 
                              [2] ${prod2.nombre} 
                              [3] ${prod3.nombre} 
                              [4] ${prod4.nombre}
                              [0] salir`);

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
                                               [0] salir`);

    
}

alert (`Muchas gracias por tu compra. Esta incluye ${descripcion}  y el total a pagar es $${total}`);