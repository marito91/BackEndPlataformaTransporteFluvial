const { Router } = require("express");
const puertosRutas = Router();
const { puertoModel } = require("../modelos/puerto");
const { configModel } = require("../modelos/configuracion");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
//const { userGuard } = require("../guards/userGuard");

const { registroPuerto, puertoRegistrado, puertos, distanciaPuertos, costoMilla, costoUpdate, costo, distancias } = require("../datos");

const tasaDolar = 4000;

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

/* Codigo para realizar registro de orden de manera local

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
    */

    // Inicio del codigo con base de datos

    // Se recibe un json con toda la informacion respectiva para crear un usuario nuevo
    const {nomPto, idPto, distPto, munPto, rioPto} = req.body;
    // Se obtiene el numero de documento para revisar si el usuario ya existe
    //const port = req.body.idPto;
    // Se hace una busqueda del documento para ver si ya existe
    puertoModel.findOne({puerto_id: idPto}, function (error, oldPort) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: en el proceso" });
        } else {
            if (oldPort !== null && oldPort !== undefined) {
                return res.send({ estado: "ok", msg: "Error: El puerto ya se encuentra registrado en nuestra base de datos." });
            } else {
                // Se crea un nuevo usuario con una instancia del modelo de usuario y se le agrega toda la informacion que viene del front
                const newPort = new puertoModel({ nombre_puerto: nomPto, puerto_id: idPto, distancia: distPto});
                newPort.save(function (error) {
                    if (error) {
                        return res.send({ estado: "error", msg: "ERROR: Al registrar un nuevo puerto" });
                    }
                    res.send({ estado: "ok", msg: "Puerto registrado exitosamente." });
                });
            }
        }
    })
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
    puertoModel.find({}, (error, port) => {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: en el proceso" });
        } else {
            const ports = port.map(p => p);
            res.send({ estado: "ok", data: ports })
        }
      });
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

/* Codigo para manejo de datos locales
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

*/
    let alerta = "No se pudo realizar la operación"
    let estado = "error"
    // Se reciben los datos de origen para poder hacer los calculos
    const { origen, destino } = req.body;
    // Se buscan los puertos en BD para determinar sus distancias
    puertoModel.find({ nombre_puerto: {$in: [origen, destino] } }, (error, port) => { 
        if (error) {
            return res.send({ estado: "error", msg: "Error: Uno de los puertos no aparece registrado en nuestro sistema." });
        } else {
            const ports = port.map(p => p);
            // Se verifica que se hayan registrado ambos puertos
            console.log(ports);
            // Se suman las distancias de ambos puertos para determinar el valor a pagar
            const distancia = ports[0].distancia + ports[1].distancia;
            // Se verifica que se haya sumado la distancia
            console.log(distancia);
            // Se busca el valor de la milla actual
            configModel.find({}, (error, costo) => {
                if (error) {
                    return res.send({ estado: "error", msg: "No se pudo validar el precio a pagar." });
                } else {
                    console.log(costo);
                    // Se calcula el valor en pesos segun la tasa del dolar manifestada al inicio del archivo
                    const pesos = costo[0].valor * tasaDolar;
                    // Se determina el precio total a cancelar en pesos segun la distancia de ambos puertos
                    const precio = pesos * distancia;
                    console.log(precio)
                    // Se envia la info al front
                    return res.send({ estado: "ok", msg: "Distancia y valor calculado exitosamente.", distancia, precio });
                }
            })
        }
    });   
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

    /*
    // Recibe el valor en dolares del Front
    const { dolares } = req.body;
    // Se hace seguimiento de como llega el valor
    //console.log(dolares)
    // Se actualiza el costo de la milla en BD
    costo.valor = dolares;

    res.send({estado: "ok", msg:"Costo de milla actualizado satisfactoriamente"});
    */

   // Se recibe info del front
    const { dolares } = req.body;

    // Se actualiza el valor de la milla en BD
    configModel.updateOne({}, { $set: { valor: dolares } }, function (error) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: Al configurar el costo de la milla." });
        } else {
            return res.send({ estado: "ok", msg: "Costo de milla actualizado satisfactoriamente."});
        }
    })   
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

/* Codigo con datos locales
    // Hace la conversion a pesos segun el valor en doalres
    const pesos = costo.valor * tasaDolar;
    // Se hace seguimiento por consola para ver si la operacion es correcta
    //console.log(pesos);
    //console.log(costo.valor);
    // Envia un estado ok, con un mensaje y los respectivos valores en dolares y pesos
    res.send({ estado: "ok", msg: "Costo de milla actual", data: costo.valor, pesos });

*/

    // Se busca el valor actual de la milla en BD
    configModel.findOne({}, function (error, costo) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: Al identificar el costo de la milla." });
        } else {
            // Hace la conversion a pesos segun el valor en dolares
            const pesos = costo.valor * tasaDolar;
            // Envia un estado ok, con un mensaje y los respectivos valores en dolares y pesos
            return res.send({ estado: "ok", msg: "Costo de milla actual", data: costo.valor, pesos });
        }
    })
});



/**
* API Rest Modulo de eliminar puertos
* Descripcion: Elimina los puertos registrados
* Ruta: /eliminarPuerto
* Metodo: POST
* Headers:"Content-Type: application/json"
* Datos de respuesta: { msg }
*/

puertosRutas.post("/eliminarPuerto", function(req, res) {
    // Desestructuracion
    const { puerto } = req.body;
    puertoModel.findOne({puerto_id: puerto}, function (error, oldPort) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: No se encontró el puerto solicitado." });
        } else {
            if (oldPort !== null && oldPort !== undefined) {
                puertoModel.remove({ puerto_id: puerto }, function (error) {
                    if (error) {
                        return res.send({ estado: "error", msg: "ERROR: Al eliminar el puerto" });
                    } else {
                        res.send({ estado: "ok", msg: "Puerto eliminado exitosamente." });
                    }
                });
            } 
        }
    });    
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