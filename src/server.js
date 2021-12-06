

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

/* PRUEBA 
app.post("/contacto", function(req,res) {
    const {nombre,correo,mensaje} = req.body;
    const contact = {name : nombre, email: correo, mensj: mensaje};
    contactos.push(contact);
    console.log(contactos);
    res.send({estado: "ok", msg : "Mensaje recibido"})
})
*/



app.listen(5000, () => {
    console.log("Servidor escuchando en el puerto 5000")
})