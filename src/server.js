

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
 * API Rest Modulo de listar usuarios
 * Descripcion: Buscar los usuarios y muestra la información de ellos
 * Ruta: /listarUsuario
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: [
    {
        "numero_documento":"24526698",
        "nombre":"Pedro",
        "apellido":"Lopez",
        "perfil":2,
        "celular":"31098442945",
        "email":"pedro.lopez@gmail.com"
    },
    {
        "numero_documento":"102234456",
        "nombre":"Juan Carlos",
        "apellido":"Guitierrez",
        "perfil":2,
        "celular":"3208694311",
        "email":"gutijc@gmail.com"
    },
    {
        "numero_documento":"13009884",
        "nombre":"Maria",
        "apellido":"Arenas",
        "perfil":1,
        "celular":"3145566787",
        "email":"marenas@gmail.com"
    },
    {
        "numero_documento":"108844532",
        "nombre":"Dario",
        "apellido":"Diaz",
        "perfil":0,
        "celular":"3005782311",
        "email":"dario.diaz@gmail.com"
    }
]
 */

app.get("/listarUsuario", function(req, res) {
    res.send("Muestra los datos del usuario")
})



/**
 * API Rest Modulo de listar órdenes
 * Descripcion: Buscar las órdenes y muestra toda la información de ellas
 * Ruta: /listarOrden
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
    {
        "id_orden":1003,
        "fecha_orden":"2021-11-30 17:44:30",
        "nombre_contenedor":"MIC1322",
        "puerto_origen":"Puerto Salgar",
        "puerto_destino":"Puerto Tumaco",
        "estado_orden":"Desspachada"
    }
]
 */

app.get("/listarOrden", function(req, res) {
    res.send("Muestra los datos de la orden")
})



/**
 * API Rest Modulo de editar órdenes
 * Descripcion: Actualiza la información de las órdenes ya creadas
 * Ruta: /listarOrden
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: {
	    "id_orden": 1004,
	    "estado_orden": "Finalizada"
    }
 * Datos de respuesta: {
        "codigo": "200",
        "descripcion": "Orden actualizada exitosamente"
    }
 */

app.post("/listarOrden", function(req, res) {
    res.send("Actualiza los datos de la orden")
})


/**
 * API Rest Modulo de puertos
 * Descripcion: Identifica la distancia entre los puertos
 * Ruta: /listarOrden
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: [
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":172
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":172
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Cabuyo",
	  "distancia":164
   },
   {
      "nombre_puerto_origen":"Puerto_Cabuyo",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":164
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_López",
	  "distancia":190
   },
   {
      "nombre_puerto_origen":"Puerto_López",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":190
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Guaviare",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Guaviare",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Mitú",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Mitú",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Yuruparí",
	  "distancia":198
   },
   {
      "nombre_puerto_origen":"Puerto_Yuruparí",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":198
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Pucarón",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Pucarón",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Calamar",
	  "distancia":154
   },
   {
      "nombre_puerto_origen":"Puerto_Calamar",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":154
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Inírida",
	  "distancia":160
   },
   {
      "nombre_puerto_origen":"Puerto_Inírida",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":160
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Tumaco",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Tumaco",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Buenaventura",
	  "distancia":206
   },
   {
      "nombre_puerto_origen":"Puerto_Buenaventura",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":206
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Salgar",
	  "distancia":211
   },
   {
      "nombre_puerto_origen":"Puerto_Salgar",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":211
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Berrio",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Berrio",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Barrancabermeja",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Barrancabermeja",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Cartagena",
	  "distancia":207
   },
   {
      "nombre_puerto_origen":"Puerto_Cartagena",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":207
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Santa_Marta",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Santa_Marta",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Barranquilla",
	  "distancia":210
   },
   {
      "nombre_puerto_origen":"Puerto_Barranquilla",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":210
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Gamarra",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_Gamarra",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":186
   },  
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":157
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":157
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Cabuyo",
	  "distancia":176
   },
   {
      "nombre_puerto_origen":"Puerto_Cabuyo",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":176
   },
    {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_López",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_López",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Guaviare",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Guaviare",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Mitú",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_Mitú",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Yuruparí",
	  "distancia":191
   },
   {
      "nombre_puerto_origen":"Puerto_Yuruparí",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":191
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Pucarón",
	  "distancia":221
   },
   {
      "nombre_puerto_origen":"Puerto_Pucarón",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":221
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Calamar",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Calamar",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Inírida",
	  "distancia":208
   },
   {
      "nombre_puerto_origen":"Puerto_Inírida",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":208
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Tumaco",
	  "distancia":212
   },
   {
      "nombre_puerto_origen":"Puerto_Tumaco",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":212
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Buenaventura",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Buenaventura",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Salgar",
	  "distancia":175
   },
   {
      "nombre_puerto_origen":"Puerto_Salgar",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":175
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Berrio",
	  "distancia":187
   },
   {
      "nombre_puerto_origen":"Puerto_Berrio",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":187
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Barrancabermeja",
	  "distancia":189
   },
   {
      "nombre_puerto_origen":"Puerto_Barrancabermeja",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":189
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Cartagena",
	  "distancia":203
   },
   {
      "nombre_puerto_origen":"Puerto_Cartagena",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":203
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Santa_Marta",
	  "distancia":205
   },
   {
      "nombre_puerto_origen":"Puerto_Santa_Marta",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":205
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Barranquilla",
	  "distancia":211
   },
   {
      "nombre_puerto_origen":"Puerto_Barranquilla",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":211
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Gamarra",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Gamarra",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Cabuyo",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Cabuyo",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_López",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_López",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Guaviare",
	  "distancia":204
   },
   {
      "nombre_puerto_origen":"Puerto_Guaviare",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":204
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Mitú",
	  "distancia":177
   },
   {
      "nombre_puerto_origen":"Puerto_Mitú",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":177
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Yuruparí",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Yuruparí",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Pucarón",
	  "distancia":198
   },
   {
      "nombre_puerto_origen":"Puerto_Pucarón",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":198
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Calamar",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Calamar",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Inírida",
	  "distancia":156
   },
   {
      "nombre_puerto_origen":"Puerto_Inírida",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":156
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Tumaco",
	  "distancia":166
   },
   {
      "nombre_puerto_origen":"Puerto_Tumaco",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":166
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Buenaventura",
	  "distancia":240
   },
   {
      "nombre_puerto_origen":"Puerto_Buenaventura",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":240
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Salgar",
	  "distancia":219
   },
   {
      "nombre_puerto_origen":"Puerto_Salgar",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":219
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Berrio",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Berrio",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Barrancabermeja",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Barrancabermeja",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Cartagena",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Cartagena",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Santa_Marta",
	  "distancia":190
   },
   {
      "nombre_puerto_origen":"Puerto_Santa_Marta",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":190
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Barranquilla",
	  "distancia":194
   },
   {
      "nombre_puerto_origen":"Puerto_Barranquilla",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":194
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Gamarra",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Gamarra",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Cabuyo",
	  "nombre_puerto_destino":"Puerto_López",
	  "distancia":175
   },
   {
      "nombre_puerto_origen":"Puerto_López",
	  "nombre_puerto_destino":"Puerto_Cabuyo",
	  "distancia":175
   }
]
 */

app.get("/listarPuertoDistancia", function(req, res) {
    res.send("Identifica la distancia entre los puertos")
})



app.listen(5000, () => {
    console.log("Servidor escuchando en el puerto 5000")
})