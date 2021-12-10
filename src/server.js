//npm init -y
//npm install @babel/cli @babel/core @babel/node @babel/preset-env --save-dev
//npm install express --save
//npm run build && node ./build/server.jsclear
//npm install cors --save
//npm i mongoose (desde la carpeta back)
//npm install jsonwebtoken bcryptjs --save (Instala los webtoken y bcrypt)

const express = require("express");
const cors = require("cors"); 
const mongoose = require("mongoose");
const Usuario = require("./modelos/usuarioModel");
const Orden = require("./modelos/orden");
const Puerto = require("./modelos/puerto");
//const { productos } = require("./datos");
const { login, loginUpdate, registroUsuario, usuarioRegistrado, registroOrden, newOrden, registroPuerto, 
        puertoRegistrado, ordenDetalle, estados, puertos, distanciaPuertos, costoMilla, costoUpdate, costo, 
        usuarios, ordenes, editarOrden, ordenUpdate, distancias } = require("./datos");
const app = express();
app.use(cors()); // Middleware CORS
app.use(express.json()) // Middleware convertir json
app.use(express.urlencoded({ extended: true })); // Codifica la informacion que viene por el cliente en la barra de busqueda del navegador

// Se conecta la aplicación a Base de Datos
mongoose.connect("mongodb://127.0.0.1:27017/naviera")
.then(res => console.log("Conectado a base de datos"))
.catch(error => console.log(error));

app.get("/", function (req, res) {
    res.send("Prueba")
})

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
 * API Rest Modulo de registro de órdenes
 * Descripcion: Registra las ordenes de los usuarios
 * Ruta: /registrarOrden
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: { registroOrden }
 * Respuesta: { newOrden }
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
 * Datos de entrada: { registroPuerto }
 * Respuesta: { puertoRegistrado }
 */

app.post("/registrarPuerto", function(req, res) {
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
 * API Rest Modulo de busqueda de ordenes
 * Descripcion: Busca las ordenes
 * Ruta: /listarOrdenDetalle/?id_orden=1002
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { ordenDetalle }
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
 * Datos de respuesta: { estados }
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
 * Datos de respuesta: { puertos }
 */

app.get("/listarPuerto", function(req, res) {
    res.send({ puertos })
})



/**
 * API Rest Modulo de calculo de distancia
 * Descripcion: Indica el precio segun la distancia calculada
 * Ruta: /listarDistanciaPuerto/?origen=Puerto_Carreño&destino=Puerto_Nariño
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { distanciaPuertos }
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
 * Datos de entrada:{ costoMilla }   
 * Datos de respuesta: { costoUpdate }
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
 * Datos de respuesta: { costo }
 */

app.get("/verCostoMilla/:id", function(req, res) {
    const id = req.params.id;
    const valor = costo.find( c => c.id.toLowerCase() === id.toLowerCase());
    res.send(valor);
    //res.send("Indica el valor del costo de milla")
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



/**
 * API Rest Modulo de listar órdenes
 * Descripcion: Buscar las órdenes y muestra toda la información de ellas
 * Ruta: /listarOrden
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { ordenes }
 */

app.get("/listarOrden", function(req, res) {
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

app.post("/editarOrden", function(req, res) {
    res.send("Actualiza los datos de la orden")
})


/**
 * API Rest Modulo de puertos
 * Descripcion: Identifica la distancia entre los puertos
 * Ruta: /listarPuertoDistancia
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { distancias }
 */

app.get("/listarPuertoDistancia", function(req, res) {
    res.send("Identifica la distancia entre los puertos")
})

app.post("/contacto", function(req, res) {
    const { nombre, email, mensaje } = req.body;
    res.send({estado : "ok", msg : "Producto guardado"});
})





app.post("/auth/signup", function(req, res) {
    res.send("Sign up new account")
})

app.post("/auth/signin", function(req, res) {
    res.send("Login an account")
})

app.get("/test/all", function(req, res) {
    res.send("Retrieve public content")
})

app.get("/test/user", function(req, res) {
    res.send("Access user's content")
})

app.get("/test/admin", function(req, res) {
    res.send("Access Admin's content")
})







app.listen(5000, () => {
    console.log("Servidor escuchando en el puerto 5000")
})