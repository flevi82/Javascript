// Declaracion de variables

let eleccion = "";
let saldo = 0;
let nuevoSaldo = 0;
let cant = 0;

// validacion

function validar (){
    if (cant >0 && cant <100){
        cant == cant *1
    }
    else {
        do{
            alert ("Ingresá un número válido");
            cant = parseInt(prompt("Elegí la cantidad"));
        }while (isNaN(cant));   

    }
}

while (eleccion !="Ninguno" && eleccion != "ninguno") {
    eleccion = prompt("¿Querés el Juego 1, el Juego 2, el Juego 3, o Ninguno?");
    if (eleccion == "Juego 1" || eleccion == "juego 1"){
        let confirma = prompt ("El Juego 1 cuesta $1000. ¿Querés agregarlo en tu carrito?");
        if (confirma == "Si" || confirma == "si"){
            cant = parseInt(prompt("Elegí la cantidad"));
            validar(cant);
            saldo = cant*1000;  
            nuevoSaldo = nuevoSaldo + saldo      
            alert ("Tu saldo es de " + nuevoSaldo)
           
        }
        else if (confirma = "no"){
            alert ("volverás al menú anterior");
        }
    }
    else if (eleccion == "Juego 2" || eleccion == "juego 2"){
        let confirma = prompt ("El Juego 2 cuesta $2000. ¿Querés agregarlo en tu carrito?");
        if (confirma == "Si" || confirma == "si"){
            cant = parseInt(prompt("Elegí la cantidad"));
            validar(cant);
            saldo = cant*2000;  
            nuevoSaldo = nuevoSaldo + saldo      
            alert ("Tu saldo es de " + nuevoSaldo);
        }
        else if (confirma = "no"){
            alert ("volverás al menú anterior");
        }
    }
    else if (eleccion == "Juego 3" || eleccion == "juego 3"){
        let confirma = prompt ("El Juego 3 cuesta $3000. ¿Querés agregarlo en tu carrito?");
        if (confirma == "Si" || confirma == "si"){
            cant = parseInt(prompt("Elegí la cantidad"));
            validar(cant);
            saldo = cant*3000;  
            nuevoSaldo = nuevoSaldo + saldo      
            alert ("Tu saldo es de " + nuevoSaldo);
        }
        else if (confirma = "no"){
            alert ("volverás al menú anterior");
        }
        
    }
    else if (eleccion == "Ninguno" || eleccion == "ninguno") {
        if (nuevoSaldo > 0 ){
            alert ("Muchas gracias, hasta pronto. Recordá que tu saldo es " + nuevoSaldo);
        }
        else {
            alert ("Muchas gracias, hasta pronto.");

        }
       
        
    }

    else {
        alert ("Elección inválida");
    }
    
}


