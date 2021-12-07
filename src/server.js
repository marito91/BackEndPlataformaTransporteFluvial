

const express = require("express");
const cors = require("cors"); 
//const { productos } = require("./datos");
const app = express();
app.use(cors()); // Middleware CORS
app.use(express.json()) // Middleware convertir json
app.use(express.urlencoded({ extended: true })); // Codifica la informacion que viene por el cliente en la barra de busqueda del navegador


app.get("/", function (req, res) {
    res.send("Prueba")
})

/**
 * API Rest Modulo de Login
 * Descripcion: Indica el ingreso de los usuarios a la plataforma.
 * Ruta: /login
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: {
 *      "usuario" : 24526698, 
 *      "password" : "Pablo102030" 
 *  }
 * Respuesta: { 
 *      "codigo" : "200", 
 *      "descripcion" : "Credenciales exitosas"
 *  }
 */

app.post("/login", function(req, res) {
    res.send("Página de Login")
})


/**
 * API Rest Modulo de registro de usuarios
 * Descripcion: Registra los usuarios a la plataforma
 * Ruta: /registrarUsuario
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: {
        "numero_documento":"24526698",
        "nombre":"Pedro",
        "apellido":"Lopez",
        "perfil":2,
        "celular":"31098442945",
        "email":"pedro.lopez@gmail.com",
        "password":"Pedro102030"
    }
 * Respuesta: {
        "codigo": "200",
        "descripcion": "Usuario registrado exitosamente"
    }
 */

app.post("/registrarUsuario", function(req, res) {
    res.send("Se registran nuevos usuarios")
})

/**
 * API Rest Modulo de registro de órdenes
 * Descripcion: Registra las ordenes de los usuarios
 * Ruta: /registrarOrden
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: {
        "articulo":"Cargamento",
        "largo":"250",
        "ancho":"150",
        "alto": 150,
        "peso":"300",
        "puertoOrigen":"Puerto A",
        "PuertoDestino":"Puerto B"
        "Descripcion":"Descripcion Cargamento"
    }
 * Respuesta: {
        "orden": "200",
        "mensaje": "Orden creada exitosamente"
    }
 */

app.post("/registrarOrden", function(req, res) {
    res.send("Se registran nuevas ordenes")
})


/**
 * API Rest Modulo de registro de puertos
 * Descripcion: Registra los puertos en la plataforma
 * Ruta: /registrarPuerto
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: {
        "nombre_puerto_origen":"Puerto_Virginia",
        "nombre_puerto_destino":"Puerto_Carreño",
        "distancia": 1024
    }
 * Respuesta: {
    "codigo": "200",
    "descripcion": "Puerto registrado exitosamente",
    "id_puerto":21,
    }
 */

app.post("/registrarPuerto", function(req, res) {
    res.send("Se registran nuevos puertos")
})


/**
 * API Rest Modulo de busqueda de ordenes
 * Descripcion: Busca las ordenes
 * Ruta: /listarOrdenDetalle/?id_orden=1002
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: {
        "id_orden":1002,
        "fecha_orden":"2021-10-13 10:21:44",
        "nombre_contenedor":"FFA5893",
        "descripción_contenedor":"Telas",	  
        "peso_contenedor":"22",
        "ancho_contenedor":"2.43",
        "alto_contenedor":"2.9",
        "largo_contenedor":"12.2",
        "puerto_origen":"Puerto Barranquilla",
        "puerto_destino":"Puerto Berrio",
        "estado_orden":"Finalizada",
        "fecha_fin_orden":"2021-10-28 11:05:01",
        "costo": 1520000
    }
 */

app.get("/listarOrdenDetalle/?id_orden=1002", function(req, res) {
    res.send("Se buscan las ordenes")
})


/**
 * API Rest Modulo de estado de ordenes
 * Descripcion: Indica el estado de las ordenes
 * Ruta: /listarOrden/?estado=Finalizada
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: [
    {
        "id_orden":1001,
        "fecha_orden":"2021-10-12 14:30:25",
        "nombre_contenedor":"SKO4477",
        "puerto_origen":"Puerto Carreño",
        "puerto_destino":"Puerto Cabuyo",
        "estado_orden":"Finalizada"
    },
    {
        "id_orden":1002,
        "fecha_orden":"2021-10-13 10:21:44",
        "nombre_contenedor":"FFA5893",
        "puerto_origen":"Puerto Barranquilla",
        "puerto_destino":"Puerto Berrio",
        "estado_orden":"Finalizada"
    },
]
 */

app.get("/listarOrden/?estado=Finalizada", function(req, res) {
    res.send("Se indica el estado de las ordenes")
})


/**
 * API Rest Modulo de listado de puertos
 * Descripcion: Indica los puertos activos
 * Ruta: /listarPuerto
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: [
    {
        "id_orden":1001,
        "fecha_orden":"2021-10-12 14:30:25",
        "nombre_contenedor":"SKO4477",
        "puerto_origen":"Puerto Carreño",
        "puerto_destino":"Puerto Cabuyo",
        "estado_orden":"Finalizada"
    },
    {
        "id_orden":1002,
        "fecha_orden":"2021-10-13 10:21:44",
        "nombre_contenedor":"FFA5893",
        "puerto_origen":"Puerto Barranquilla",
        "puerto_destino":"Puerto Berrio",
        "estado_orden":"Finalizada"
    },
]
 */

app.get("/listarPuerto", function(req, res) {
    res.send("Se listan los puertos")
})



/**
 * API Rest Modulo de calculo de distancia
 * Descripcion: Indica el precio segun la distancia calculada
 * Ruta: /listarDistanciaPuerto/?origen=Puerto_Carreño&destino=Puerto_Nariño
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: {
        "nombre_origen":"Puerto_Carreño",
        "nombre_destino":"Puerto_Nariño",
        "distancia":120
    }
 */

app.get("/listarDistanciaPuerto/?origen=Puerto_Carreño&destino=Puerto_Nariño", function(req, res) {
    res.send("Indica la distancia y el precio a pagar")
})



/**
 * API Rest Modulo de configuracion de costo de milla
 * Descripcion: Edita el valor del costo de milla
 * Ruta: /editarCostoMilla
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada:{
	  "valor": 181000
    }   
 * Datos de respuesta: {
        "codigo": "200",
        "descripcion": "Valor milla actualizado exitosamente"
    }
 */

app.get("/editarCostoMilla", function(req, res) {
    res.send("Cambia el valor del costo de milla")
})


/**
 * API Rest Modulo de vista de costo de milla
 * Descripcion: Identifica el valor del costo de milla
 * Ruta: /verCostoMilla
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: {
        "valor":124000
    }
 */

app.get("/verCostoMilla", function(req, res) {
    res.send("Indica el valor del costo de milla")
})



/**
 * Quedan pendientes las siguientes rutas:
 * /listarUsuario
 * /listarOrden
 * /editarOrden
 * /listarPuertoDistancia
 */


app.listen(5000, () => {
    console.log("Servidor escuchando en el puerto 5000")
})