const { Router } = require("express");
const ordenesRutas = Router();
const { ordenModel } = require("../modelos/orden");
const { puertoModel } = require("../modelos/puerto");
const { configModel } = require("../modelos/configuracion");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
//const { userGuard } = require("../guards/userGuard");

const { registroOrden, newOrden, ordenDetalle, estados, ordenes, editarOrden, ordenUpdate } = require("../datos");

const tasaDolar = 4000;



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

/* ------------------------------------------------------Seccion para determinar fecha---------------------------------------------------------------*/
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
    const defDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
    console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

/* ------------------------------------------------------Seccion para determinar fecha---------------------------------------------------------------*/


    // Se recibe un json con toda la informacion respectiva para crear una nueva orden
    const { user, art, height, width, length, weight, origen, destino, descr } = req.body;


    ordenModel.find({}, (error, order) => { 
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: al buscar ordenes." });
        } else {
            const orders = order.map(o => o);
            // Se verifica que se hayan registrado las ordenes en el array
            console.log(orders);

            // Se hace un loop para determinar el valor de la ultima orden
            let last = 0;
            for(var i = 0; i < orders.length; i++) {
                var obj = orders[i];
                if (last <= obj.order_id) {
                    last += 1;
                }
            }
            // Se asigna un nuevo numero de orden
            const orderId = last + 1;
            console.log(orderId)
  

            // Se hace una busqueda del documento para ver si ya existe
            ordenModel.findOne({order_id: orderId}, function (error, oldOrder) {
                if (error) {
                    return res.send({ estado: "error", msg: "ERROR: al buscar orden" });
                } else {
                    if (oldOrder !== null && oldOrder !== undefined) {
                        return res.send({ estado: "ok", msg: "Error: La orden ya se encuentra registrada en el sistema." });
                    } else {
/*--------------------------------------------------------Modulo para calcular precio a pagar-------------------------------------------------------*/
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
                                configModel.find({}, (error, milla) => {
                                    if (error) {
                                        return res.send({ estado: "error", msg: "No se pudo validar el precio a pagar." });
                                    } else {
                                        console.log(milla);
                                        // Se calcula el valor en pesos segun la tasa del dolar manifestada al inicio del archivo
                                        const pesos = milla[0].valor * tasaDolar;
                                        // Se determina el precio total a cancelar en pesos segun la distancia de ambos puertos
                                        const precio = pesos * distancia;

/*------------------------------------------------------------Modulo para crear nueva orden---------------------------------------------------------*/
                                        // Se crea una nueva orden con una instancia del modelo de orden y se le agrega toda la informacion que viene del front
                                        const newOrder = new ordenModel( {order_id: orderId, fecha_origen_orden: defDate, nombre_contenedor: art, descripcion_contenedor: descr, peso_contenedor: weight, ancho_contenedor: width, alto_contenedor: height, largo_contenedor: length, puerto_origen: origen, puerto_destino: destino, estado_orden: "Preparando para Embarcar",costo: precio, usuario: user});
                                        console.log(newOrder)                         
                                        newOrder.save(function (error) {
                                            if (error) {
                                                return res.send({ estado: "error", msg: "ERROR: Al registrar nueva orden." });
                                            } else {
                                                return res.send({ estado: "ok", msg: `Orden creada exitosamente con ID número ${orderId}. En la página de inicio podrá encontrar más detalles de su orden. Muchas gracias por usar nuestro servicio.` });
                                            }
                                        });
                                    }
                                })
                            }
                        });   
                    }
                }
            })
        }
    });
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
    
    /* Codigo para datos almacenados localmente
    const numero = req.params.orden;
    //console.log(numero);
    const orden = ordenes.find(o => o.id_orden === parseInt(numero));
    if (orden != null && orden != undefined) {
        res.send({ estado: "ok", msg: "Orden encontrada con éxito.", orden })
    } else {
        res.send({ estado: "error", msg: "No se encontró la orden solicitada" })
    }
    */
   // Se obtiene el parametro de la ruta
    const numero = parseInt(req.params.orden);

    ordenModel.findOne({order_id: numero}, function(error, orden) {
        if (error) {
            return res.send({ estado: "error", msg: "No se encontró la orden solicitada." })
        } else {
            if (orden != null && orden != undefined) {
                res.send({ estado: "ok", msg: "Orden encontrada con éxito.", orden })
            } else {
                res.send({ estado: "error", msg: "No se encontró la orden solicitada" })
            }
        }
    })
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
    
    /* Codigo para datos almacenados localmente
    //console.log(puertos);
    res.send({ estado: "ok", data: ordenes })
    */

    ordenModel.find({}, function(error, ordenes) {
        if (error) {
            return res.send({ estado: "error", msg: "No se encontraron órdenes." })
        } else {
            if (ordenes != null && ordenes != undefined) {
                res.send({ estado: "ok", msg: "Ordenes encontradas con éxito.", data: ordenes })
            } else {
                res.send({ estado: "error", msg: "No se encontraron órdenes." })
            }
        }
    })
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

/* Codigo para datos almacenados localmente
    // Desestructuracion
    const {numero, estado, art, height, width, length, weight, origen, destino, descr} = req.body;
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

    */

    // Desestructuracion
    const {numero, art, height, width, length, weight, origen, destino, descr} = req.body;

    ordenModel.findOne({order_id: numero}, function (error, oldOrder) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: al buscar orden duplicada." });
        } else {
            if (oldOrder !== null && oldOrder !== undefined) {
                ordenModel.updateOne({ order_id: numero }, { $set: { nombre_contenedor: art, descripcion_contenedor: descr, peso_contenedor: weight, ancho_contenedor: width, alto_contenedor: height, largo_contenedor: length, puerto_origen: origen, puerto_destino: destino } }, function (error) {
                    if (error) {
                        return res.send({ estado: "error", msg: "ERROR: Al editar la orden." });
                    } else {
                        res.send({ estado: "ok", msg: "Orden actualizada satisfactoriamente." });
                    }
                });
            } 
        }
    });
}); 



/**
 * API Rest Modulo de actualizar estados
 * Descripcion: Actualiza la información de las órdenes ya creadas
 * Ruta: /editarEstado
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: { estado }
 * Datos de respuesta: { estadoupdate }
 */

ordenesRutas.post("/editarEstado", function(req, res) {

    // Desestructuracion
    const { numero, newEstado } = req.body;

    ordenModel.findOne({order_id: numero}, function (error, oldOrder) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR: al buscar orden duplicada." });
        } else {
            if (oldOrder !== null && oldOrder !== undefined) {
                ordenModel.updateOne({ order_id: numero }, { $set: { estado_orden: newEstado } }, function (error) {
                    if (error) {
                        return res.send({ estado: "error", msg: "ERROR: Al editar el estado de la orden." });
                    } else {
                        res.send({ estado: "ok", msg: "Estado actualizado satisfactoriamente." });
                    }
                });
            } 
        }
    });
}); 



exports.ordenesRutas = ordenesRutas;