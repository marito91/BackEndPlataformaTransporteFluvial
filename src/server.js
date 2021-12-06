

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

app.listen(5000, () => {
    console.log("Servidor escuchando en el puerto 5000")
})