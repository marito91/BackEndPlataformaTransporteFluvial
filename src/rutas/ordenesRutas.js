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

/* Codigo para realizar registro de orden de manera local

    // Se recibe un json con toda la informacion respectiva para crear una nueva orden
    const { art, height, width, length, weight, origen, destino, descr } = req.body;
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
    // Se compara una ultima vez si existe el numero de orden
    const lastID = ordenes.find(o => o.id_orden === orderId);
    // Si la orden ya existe envia una alerta 
    if (lastID != null && lastID != undefined) {
        res.send({estado : "error", msg : "Ya existe una orden registrada."});
    } else { // de lo contrario:
        // Se crea una variable newOrder donde a cada Key se le asigna los valores que vienen del json del front end
        const newOrder = {id_orden: orderId, articulo: art, largo: length, ancho: width, alto: height, peso: weight, puerto_origen: origen, puerto_destino: destino, Descripcion: descr, estado_orden: "preparando para Embarcar" };
        // Se agrega la nueva orden a base de datos
        ordenes.push(newOrder);
        // Se confirma que se estan recibiendo todos los datos correspondientes
        // console.log(ordenes);
        // Se envia estado y mensaje al front end para confirmar que la orden fue creada con un ID, que se le entrega al usuario
        res.send({estado : "ok", msg : `Orden creada exitosamente con ID número ${orderId}. En la página de inicio podrá encontrar más detalles de su orden. Muchas gracias por usar nuestro servicio.`});

    }
*/

    // Nuevo objeto para determinar fecha
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

    // Se recibe un json con toda la informacion respectiva para crear una nueva orden
    const { art, height, width, length, weight, origen, destino, descr } = req.body;

})


/**
 * API Rest Modulo de busqueda de ordenes
 * Descripcion: Busca las ordenes
 * Ruta: /listarOrdenDetalle/?id_orden=1002
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { ordenDetalle }
 */

 ordenesRutas.get("/listarOrdenDetalle/:orden", function(req, res) {
    const numero = req.params.orden;
    //console.log(numero);
    const orden = ordenes.find(o => o.id_orden === parseInt(numero));
    if (orden != null && orden != undefined) {
        res.send({ estado: "ok", msg: "Orden encontrada con éxito.", orden })
    } else {
        res.send({ estado: "error", msg: "No se encontró la orden solicitada" })
    }
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

 ordenesRutas.post("/listarOrden", function(req, res) {
    //console.log(puertos);
    res.send({ estado: "ok", data: ordenes })
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
    // Desestructuracion
    const {numero, art, height, width, length, weight, origen, destino, descr} = req.body;
    // Se hacen las alertas predeterminadas
    let alerta = "error";
    let mensaje = "La orden no se encuentra registrada en nuestra base de datos"
    let i = 0;
    for (const o of ordenes) {
        if (o.id_orden === numero) {
            if (o.estado_orden === "Finalizada" || o.estado_orden === "Despachada") {
                alerta = "error"
                mensaje = "La orden ya fue despachada por ende no se puede editar."
            } else {
                ordenes[i].articulo = art;
                ordenes[i].altura = height;
                ordenes[i].ancho = width;
                ordenes[i].largo = length;
                ordenes[i].peso = weight;
                ordenes[i].puerto_origen = origen;
                ordenes[i].puerto_destino = destino;
                ordenes[i].descripcion = descr;
                alerta = "ok";
                mensaje = "Orden editada exitosamente"
                break;
            }       
        }
        i++;
    }
    res.send({estado : alerta, msg : mensaje});
})



exports.ordenesRutas = ordenesRutas;