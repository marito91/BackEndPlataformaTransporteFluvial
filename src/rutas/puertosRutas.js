const { Router } = require("express");
const puertosRutas = Router();
const { puertosModel } = require("../modelos/puerto");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
//const { userGuard } = require("../guards/userGuard");

const { registroPuerto, puertoRegistrado, puertos, distanciaPuertos, costoMilla, costoUpdate, costo, distancias } = require("../datos");


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
* Metodo: GET
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
* Ruta: /listarDistanciaPuerto/?origen=Puerto_Carreño&destino=Puerto_Nariño
* Metodo: GET
* Headers:"Content-Type: application/json"
* Datos de respuesta: { distanciaPuertos }
*/

puertosRutas.get("/listarDistanciaPuerto/?origen=Puerto_Carreño&destino=Puerto_Nariño", function(req, res) {
res.send("Indica la distancia y el precio a pagar")
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

puertosRutas.get("/editarCostoMilla", function(req, res) {
res.send("Cambia el valor del costo de milla")
})


/**
* API Rest Modulo de vista de costo de milla
* Descripcion: Identifica el valor del costo de milla
* Ruta: /verCostoMilla
* Metodo: GET
* Headers:"Content-Type: application/json"
* Datos de respuesta: { costo }
*/

puertosRutas.get("/verCostoMilla", function(req, res) {
    let pesos = costo * 3900;
    res.send({ estado: "ok", msg: "Costo de milla actual", data: costo, pesos });
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