//npm init -y
//npm install @babel/cli @babel/core @babel/node @babel/preset-env --save-dev
//npm install express --save
//npm run build && node ./build/server.jsclear
//npm install cors --save
//npm i mongoose (desde la carpeta back)

const express = require("express");
const cors = require("cors"); 
//const { productos } = require("./datos");
const { login, loginUpdate, registroUsuario, usuarioRegistrado, registroOrden, newOrden, registroPuerto, 
        puertoRegistrado, ordenDetalle, estados, puertos, distanciaPuertos, costoMilla, costoUpdate, costo, 
        usuarios, ordenes, editarOrden, ordenUpdate, distancias } = require("./datos");
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
    const {nombre, apellido, docType, document, email, userType, username, password} = req.body;
    const newUser = {nombre, apellido, tipo_documento: docType, numero_documento: document, email, perfil: userType, user: username, pass: password};
    usuarios.push(newUser);
    console.log(usuarios);
    res.send({estado : "ok", msg : "Usuario Registrado"});
    //res.send("Se registran nuevos usuarios")
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
    res.send("Se registran nuevos puertos")
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
    res.send("Se listan los puertos")
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

app.get("/listarUsuario", function(req, res) {
    const { document } = req.body; //Viene un json {numero_documento:"24526698"}
    const newUser = usuarios.find(u => u.numero_documento === document); // funcion find recibe una funcion flecha como parametro, la cual recibe el valor para recorrer el array y que determina el valor que quiere encontrar
    // Mensaje y estado inicializados en fallo (Por defecto se falla)
    let alerta = "El producto no fue encontrado"
    let estado = "error";
    // Si producto es diferente a nada entonces mensaje producto encontrado, de lo contrario no encontrado
    if (newUser != null && newUser != undefined) {
        alerta = "Usuario encontrado."
        estado = "ok"
    }    
    res.send({estado: estado, msg: alerta, data: newUser});
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



app.listen(5000, () => {
    console.log("Servidor escuchando en el puerto 5000")
})