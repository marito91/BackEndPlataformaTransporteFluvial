const { Router } = require("express");
const ordenesRutas = Router();
const { ordenModel } = require("../modelos/orden");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
//const { userGuard } = require("../guards/userGuard");

const { registroOrden, newOrden, ordenDetalle, estados, ordenes, editarOrden, ordenUpdate } = require("../datos");


/**
 * API Rest Modulo de registro de órdenes
 * Descripcion: Registra las ordenes de los usuarios
 * Ruta: /registrarOrden
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: { registroOrden }
 * Respuesta: { newOrden }
 */

 ordenesRutas.post("/registrarOrden", function(req, res) {
    // Se recibe un json con toda la informacion respectiva para crear una nueva orden
    const { art, height, width, length, weight, origen, destino, descr } = req.body;
    // Se obtiene el numero de documento para revisar si el usuario ya existe
    //const id = req.body.document;
    // Se hace un loop para determinar el valor de la ultima orden
    let last = 0;
    for(var i = 0; i < ordenes.length; i++) {
        var obj = ordenes[i];
        if (last <= obj.id_orden) {
            last += 1;
        }
    }
    // Se asigna un nuevo numero de orden
    const orderId = last + 1;
    console.log(orderId)
    // Se compara una ultima vez si existe el numero de orden
    const lastID = ordenes.find(o => o.id_orden === orderId);
    console.log(lastID)
    // Si la orden ya existe envia una alerta 
    if (lastID != null && lastID != undefined) {
        res.send({estado : "error", msg : "Ya existe una orden registrada."});
    } else { // de lo contrario:
        // Se crea una variable newOrder donde a cada Key se le asigna los valores que vienen del json del front end
        const newOrder = {id_orden: orderId, articulo: art, largo: length, ancho: width, alto: height, peso: weight, puertoOrigen: origen, PuertoDestino: destino, Descripcion: descr, estadoOrd: "Registro-Embarque" };
        // Se agrega la nueva orden a base de datos
        ordenes.push(newOrder);
        // Se confirma que se estan recibiendo todos los datos correspondientes
        console.log(ordenes);
        // Se envia estado y mensaje al front end para confirmar que la orden fue creada con un ID, que se le entrega al usuario
        res.send({estado : "ok", msg : `Orden creada exitosamente con ID número ${orderId}. En la página de inicio podrá encontrar más detalles de su orden. Muchas gracias por usar nuestro servicio.`});

    }
})


/**
 * API Rest Modulo de busqueda de ordenes
 * Descripcion: Busca las ordenes
 * Ruta: /listarOrdenDetalle/?id_orden=1002
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { ordenDetalle }
 */

 ordenesRutas.get("/listarOrdenDetalle/?id_orden=1002", function(req, res) {
    res.send("Se buscan las ordenes")
})


/**
 * API Rest Modulo de estado de ordenes
 * Descripcion: Indica el estado de las ordenes
 * Ruta: /listarOrden/?estado=Finalizada
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { estados }
 */

ordenesRutas.get("/listarOrden/?estado=Finalizada", function(req, res) {
    res.send("Se indica el estado de las ordenes")
})


/**
 * API Rest Modulo de listar órdenes
 * Descripcion: Buscar las órdenes y muestra toda la información de ellas
 * Ruta: /listarOrden
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { ordenes }
 */

 ordenesRutas.get("/listarOrden", function(req, res) {
    res.send("Muestra los datos de la orden")
})



/**
 * API Rest Modulo de editar órdenes
 * Descripcion: Actualiza la información de las órdenes ya creadas
 * Ruta: /editarOrden
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: { editarOrden }
 * Datos de respuesta: { ordenUpdate }
 */

ordenesRutas.post("/editarOrden", function(req, res) {
    res.send("Actualiza los datos de la orden")
})


exports.ordenesRutas = ordenesRutas;