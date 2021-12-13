const { Router } = require("express");
const userRutas = Router();
const { userModel } = require("../modelos/usuarioModel");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
//const { userGuard } = require("../guards/userGuard");

const { login, loginUpdate, registroUsuario, usuarioRegistrado, usuarios } = require("./datos");



    /**
 * API Rest Modulo de Login
 * Descripcion: Indica el ingreso de los usuarios a la plataforma.
 * Ruta: /login
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: { login }
 * Respuesta: { loginUpdate }
 */

app.post("/login", function(req, res) {
    res.send("Autenticación de usuarios")
})


/**
 * API Rest Modulo de registro de usuarios
 * Descripcion: Registra los usuarios a la plataforma
 * Ruta: /registrarUsuario
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada:  { registroUsuario }
 * Respuesta: { usuarioRegistrado }
 */

app.post("/registrarUsuario", function(req, res) {
    // Se recibe un json con toda la informacion respectiva para crear un usuario nuevo
    const {nom, lastName, documentType, document, emailAddress, userType, phone, password} = req.body;
    // Se obtiene el numero de documento para revisar si el usuario ya existe
    const id = req.body.document;
    // Se hace una busqueda del documento para ver si ya existe
    const oldUser = usuarios.find(u => u.numero_documento === id);
    // Si el usuario ya existe envia una alerta 
    if (oldUser != null && oldUser != undefined) {
        res.send({estado : "error", msg : "El usuario ya se encuentra registrado en el sistema."});
    } else { // de lo contrario:
        // Se determina el tipo de perfil segun la informacion que recibe
        if (userType === 'Item 2') {
            profile = 1;
        } else if (userType === 'Item 3') {
            profile = 2;
        }
        // Se determina el tipo de documento segun la informacion que recibe
        if (documentType === 'Item 2') {
            idType = "C.C";
        } else if (documentType === 'Item 3') {
            idType = "C.E";
        } else if (documentType === 'Item 4') {
            idType = "NIT";
        }
        // Se crea una variable newUser donde a cada Key se le asigna los valores que vienen del json del front end
        const newUser = {nombre: nom, apellido: lastName, tipo_documento: idType, numero_documento: document, email: emailAddress, perfil: profile, celular: phone, pass: password};
        // Se agrega el newUser a base de datos
        usuarios.push(newUser);
        // Se confirma que se estan recibiendo todos los datos correspondientes
        console.log(usuarios);
        // Se envia estado y mensaje al front end para confirmar que el usuario se registro
        res.send({estado : "ok", msg : "Usuario Registrado"});

    }
  
})


/**
 * API Rest Modulo de listar usuarios
 * Descripcion: Buscar los usuarios y muestra la información de ellos
 * Ruta: /listarUsuario
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { usuarios }
 */

 app.get("/listarUsuario/:documento", function(req, res) {
    let alerta = "No se encontró el usuario solicitado"
    let estado = "error"
    //const { document } = req.body; //Viene un json {numero_documento:"24526698"}
    const document = req.params.documento; //Viene un json {numero_documento:"24526698"}
    const oldUser = usuarios.find(u => u.numero_documento === document);

    if (oldUser != null && oldUser != undefined) {
        alerta = "Usuario encontrado exitosamente"
        estado = "ok"
    }
    res.send({estado: estado, msg: alerta, data: oldUser})
}); 

exports.userRutas = userRutas;