

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
 * Datos de entrada: { "usuario" : 24526698, "password" : "Pablo102030" }
 * Respuesta: { "codigo" : "200", "descripcion" : "Credenciales exitosas"}
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
    res.send("Página de registro de usuario")
})

/**
 * API Rest Modulo de registro de órdenes
 * Descripcion: Registra los usuarios a la plataforma
 * Ruta: /registrarOrden
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

app.post("/registrarOrden", function(req, res) {
    res.send("Página de registro de usuario")
})


app.listen(5000, () => {
    console.log("Servidor escuchando en el puerto 5000")
})