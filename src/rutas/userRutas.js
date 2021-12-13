const { Router } = require("express");
const userRutas = Router();
const { userModel } = require("../modelos/usuarioModel");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
//const { userGuard } = require("../guards/userGuard");

const { login, loginUpdate, registroUsuario, usuarioRegistrado, usuarios } = require("../datos");


    /**
 * API Rest Modulo de Login
 * Descripcion: Indica el ingreso de los usuarios a la plataforma.
 * Ruta: /login
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: { login }
 * Respuesta: { loginUpdate }
 */

userRutas.post("/login", function(req, res) {
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

userRutas.post("/registrarUsuario", function(req, res) {
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

 userRutas.get("/listarUsuario/:documento", function(req, res) {
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


/**
 * API Rest Modulo de editar usuarios
 * Descripcion: Busca los usuarios y actualiza la información de ellos
 * Ruta: /editarUsuario
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: {nom, lastName, documentType, document, emailAddress, userType, phone, password}
 * Datos de respuesta: {estado : "ok", mensaje : "Usuario Guardado"}
 */

 userRutas.post("/editarUsuario", function(req, res) {
    // Desestructuracion
    const {nom, lastName, documentType, document, emailAddress, userType, phone, password} = req.body;
    // Buscar el usuario a Editar
    let i = 0;
    // Se hacen las alertas predeterminadas
    let alerta = "error";
    let mensaje = "El usuario no se encuentra registrado en nuestra base de datos"
    for (const u of usuarios) {
        if (u.numero_documento.toLowerCase() == document.toLowerCase()) {
            // Se hacen las respectivas validaciones con la informacion que viene de los SELECT FIELDS
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
            // Actualiza el producto con los nuevos datos
            usuarios[i].nombre = nom; // Se modifican los datos almacenados con los que trae el json 
            usuarios[i].apellido = lastName; // Se modifican los datos almacenados con los que trae el json 
            usuarios[i].tipo_documento = idType; // Se modifican los datos almacenados con los que trae el json 
            usuarios[i].numero_documento = document; // Se modifican los datos almacenados con los que trae el json 
            usuarios[i].email = emailAddress; // Se modifican los datos almacenados con los que trae el json 
            usuarios[i].perfil = profile; // Se modifican los datos almacenados con los que trae el json 
            usuarios[i].celular = phone; // Se modifican los datos almacenados con los que trae el json 
            usuarios[i].pass = password; // Se modifican los datos almacenados con los que trae el json - ESTE SE DEBE AJUSTAR CUANDO SE HAGA LA AUTENTICACION
            alerta = "ok";
            mensaje = "Usuario editado exitosamente"
            break;            
        }
        i++;
    }
    res.send({estado : alerta, msg : mensaje});
}); 


/**
 * API Rest Modulo de eliminacion de Usuarios (se ajusta a BD)
 * Descripcion: Elimina un usuario guardado en la base de datos.
 * Ruta: /eliminarUsuario
 * Metodo: POST
 * Datos de entrada: { document }
 * Respuesta: {estado : "ok", mensaje : "Usuario Eliminado"}
 */
 userRutas.post("/eliminarUsuario", function(req,res) {
    // Desestructuracion
    const { document } = req.body;
    // Buscar el usuario a Eliminar
    let i = 0;
    for (const u of usuarios) {
        if (u.numero_documento.toLowerCase() == document.toLowerCase()) {
            usuarios.splice(i, 1);
            break;
        }
        i++;
    }
    res.send({estado : "ok", msg : "Usuario Eliminado"});
})

exports.userRutas = userRutas;