const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordenModel = new Schema(
    {
        fecha_origen_orden:{
            type: "date",
            required:true
        },
        nombre_contenedor:{
            type: "string",
            required:true
        },
        descripcion_contendeor:{
            type: "string",
            required:true
        },
        peso_contenedor:{
            type: "number",
            required:true
        },
        ancho_contenedor:{
            type: "number",
            required:true
        },
        alto_contenedor:{
            type: "number",
            required:true
        },
        largo_contenedor:{
            type: "number",
            required:true
        },
        puerto_origen:{
            type: "string",
            required:true
        },
        puerto_destino:{
            type: "string",
            required:true
        },
        estado_orden:{
            type: "string"
        },
        fecha_fin_orden:{
            type: "date"
        },
        costo:{
            type: "string",
            required:true
        }
    }
);

module.exports = mongoose.model("orden", ordenModel);