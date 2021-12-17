const { Router } = require("express");
const puertosRutas = Router();
const { puertosModel } = require("../modelos/puerto");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
//const { userGuard } = require("../guards/userGuard");

const { registroPuerto, puertoRegistrado, puertos, distanciaPuertos, costoMilla, costoUpdate, costo, distancias } = require("../datos");

const tasaDolar = 3900;

/**
 * API Rest Modulo de registro de puertos
 * Descripcion: Registra los puertos en la plataforma
 * Ruta: /registrarPuerto
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: { registroPuerto }
 * Respuesta: { puertoRegistrado }
 */

 puertosRutas.post("/registrarPuerto", function(req, res) {
    // Se recibe un json con toda la informacion respectiva para crear un usuario nuevo
    const {nomPto, idPto, distPto, munPto, rioPto} = req.body;
    // Se obtiene el numero de documento para revisar si el usuario ya existe
    const id = req.body.idPto;
    // Se hace una busqueda del documento para ver si ya existe
    const puerto = puertos.find(p => p.id_puerto === id);
    // Si el usuario ya existe envia una alerta 
    if (puerto != null && puerto != undefined) {
        res.send({estado : "error", msg : "El puerto ya se encuentra registrado en el sistema."});
    } else { // de lo contrario:
        // Se crea una variable newPort donde a cada Key se le asigna los valores que vienen del json del front end
        const newPort = {nombre: nomPto, id_puerto: idPto, millas: distPto, municipio: munPto, rioPto};
        // Se agrega el newUser a base de datos
        puertos.push(newPort);
        // Se confirma que se estan recibiendo todos los datos correspondientes
        console.log(puertos);
        // Se envia estado y mensaje al front end para confirmar que el usuario se registro
        res.send({estado : "ok", msg : "Puerto registrado exitosamente."});

    }
})





/**
* API Rest Modulo de listado de puertos
* Descripcion: Indica los puertos activos
* Ruta: /listarPuerto
* Metodo: POST
* Headers:"Content-Type: application/json"
* Datos de respuesta: { puertos }
*/

puertosRutas.post("/listarPuerto", function(req, res) {
    //console.log(puertos);
    res.send({ estado: "ok", data: puertos })
})



/**
* API Rest Modulo de calculo de distancia
* Descripcion: Indica el precio segun la distancia calculada
* Ruta: /listarDistanciaPuerto/
* Metodo: POST
* Headers:"Content-Type: application/json"
* Datos de respuesta: { distanciaPuertos, costo }
*/

puertosRutas.post("/listarDistanciaPuerto", function(req, res) {
    const { origen, destino } = req.body;
    //const portA = determinarPuerto(origen);
    //console.log(portA);
    // Se buscan los puertos en BD para determinar sus distancias
    const puertoA = distancias.find(d => d.nombre.toLowerCase() === origen.toLowerCase());
    const puertoB = distancias.find(d => d.nombre.toLowerCase() === destino.toLowerCase());
    // Se suman las distancias de ambos puertos para determinar el valor a pagar
    const distancia = puertoA.distancia + puertoB.distancia;
    // Se calcula el valor en pesos segun la tasa del dolar manifestada al inicio del archivo
    const pesos = costo.valor * tasaDolar;
    // Se determina el precio total a cancelar en pesos segun la distancia de ambos puertos
    const precio = pesos * distancia;
    // Se hacen las respectivas validaciones de cada uno de los datos antes de enviarlos al Front
    //console.log(puertoA)
    //console.log(puertoB)
    //console.log(distancia)
    //console.log(precio)

    res.send({ estado:"ok", msg:"Distancia y valor calculado", distancia, precio })
})



/**
* API Rest Modulo de configuracion de costo de milla
* Descripcion: Edita el valor del costo de milla
* Ruta: /editarCostoMilla
* Metodo: POST
* Headers:"Content-Type: application/json"
* Datos de entrada:{ costoMilla }   
* Datos de respuesta: { costoUpdate }
*/

puertosRutas.post("/editarCostoMilla", function(req, res) {
    // Recibe el valor en dolares del Front
    const { dolares } = req.body;
    // Se hace seguimiento de como llega el valor
    //console.log(dolares)
    // Se actualiza el costo de la milla en BD
    costo.valor = dolares;

    res.send({estado: "ok", msg:"Costo de milla actualizado satisfactoriamente"});
});


/**
* API Rest Modulo de vista de costo de milla
* Descripcion: Identifica el valor del costo de milla
* Ruta: /verCostoMilla
* Metodo: GET
* Headers:"Content-Type: application/json"
* Datos de respuesta: { costo }
*/

puertosRutas.post("/verCostoMilla", function(req, res) {
    // Hace la conversion a pesos segun el valor en doalres
    const pesos = costo.valor * tasaDolar;
    // Se hace seguimiento por consola para ver si la operacion es correcta
    //console.log(pesos);
    //console.log(costo.valor);
    // Envia un estado ok, con un mensaje y los respectivos valores en dolares y pesos
    res.send({ estado: "ok", msg: "Costo de milla actual", data: costo.valor, pesos });
})



/**
* API Rest Modulo de puertos
* Descripcion: Identifica la distancia entre los puertos
* Ruta: /listarPuertoDistancia
* Metodo: GET
* Headers:"Content-Type: application/json"
* Datos de respuesta: { distancias }
*/

puertosRutas.get("/listarPuertoDistancia", function(req, res) {
    res.send("Identifica la distancia entre los puertos")
})


exports.puertosRutas = puertosRutas;



function determinarPuerto(item) {
    let port = "";
    if (item === 'Item 2') {
        port = "Puerto_Carreño";
    } else if (item === 'Item 3') {
        port = "Puerto_Nariño";
    } else if (item === 'Item 4') {
        port = "Puerto_Banqueta";
    } else if (item === 'Item 5') {
        port = "Puerto_Cabuyo";
    } else if (item === 'Item 6') {
        port = "Puerto_López";
    } else if (item === 'Item 7') {
        port = "Puerto_Guaviare";
    } else if (item === 'Item 8') {
        port = "Puerto_Mitú";
    } else if (item === 'Item 9') {
        port = "Puerto_Yuruparí";
    } else if (item === 'Item 10') {
        port = "Puerto_Pucarón";
    } else if (item === 'Item 11') {
        port = "Puerto_Calamar";
    } else if (item === 'Item 12') {
        port = "Puerto_Inírida";
    } else if (item === 'Item 13') {
        port = "Puerto_Tumaco";
    } else if (item === 'Item 14') {
        port = "Puerto_Buenaventura";
    } else if (item === 'Item 15') {
        port = "Puerto_Salgar";
    } else if (item === 'Item 16') {
        port = "Puerto_Berrio";
    } else if (item === 'Item 17') {
        port = "Puerto_Barrancabermeja";
    } else if (item === 'Item 18') {
        port = "Puerto_Cartagena";
    } else if (item === 'Item 19') {
        port = "Puerto_Santa_Marta";
    } else if (item === 'Item 20') {
        port = "Puerto_Barranquilla";
    } else if (item === 'Item 21') {
        port = "Puerto_Gamarra";
    }
    return port;
}