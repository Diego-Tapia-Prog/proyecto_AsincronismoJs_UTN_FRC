import readline from 'readline';

function imprimir(callback) {
    callback();
}
//Esta es la forma en la que definimos el callback
imprimir(function () {
    console.log('Texto impreso');
});

// Y esto es la interpretacion de lo que estariamos haciendo originalmente sin persar en funciones que pasan funciones de 
// forma directa por parametro
const imprimirConsola = function () {
    console.log("Texto impreso por consola");
};

/*
setTimeout(function () {
    console.log('Y este mensaje se ejecuta antes del siguiente...')
}, 1000);
*/

const rlGlobal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function saludar(nombre) {
    console.log('Hola ' + nombre);
    rl.close()
};

function procesarEntradaUsuario(callback) {
    rl.question('Porfavor ingresa tu nombre: ', (nombre) => {
        callback(nombre);
    });
};

function cocinarPizza(tiempo, callback) {
    console.log('Hola la pizza se paso al estado de preparacion');
    callback(tiempo);
    console.log(`La pizza tardara ${tiempo} segundos en salir`);
};

function main() {
    console.log("-----------------------------------------");
    console.log(`Este es un menu para poder ejecutar mis practicas de:
                 Callback y Promesas en Javascript`)
    const menu = `
                MENU DE OPCIONES
                1) Callback
                2) Promesas
                0) Salir
                Porfavor ingresa tu seleccion:  `
    rlGlobal.question(menu, (opcion) => {
        switch (opcion) {
            case "1":
                //procesarEntradaUsuario(saludar);
                //imprimir(imprimirConsola);
                //setTimeout(imprimirConsola, 2000);
                cocinarPizza(3, (tiempoInicial) => {
                    for (let i = tiempoInicial; i >= 0; i--) {
                        setTimeout(function () {
                            console.log(`La pizza va a estar en ${i} segundos`);

                            if (i === 0) {
                                console.log("¡La pizza está lista! 🍕");
                            };
                        }, (tiempoInicial - i) * 1000);
                    };
                }
                );
                main();
                break;
            case "2":
                console.log('Por determinar');
                main();
                break
            default:
                console.log('Fin del programa gracias por ejercutarlo')
                rlGlobal.close()
                break;
        };
    });
};
main()