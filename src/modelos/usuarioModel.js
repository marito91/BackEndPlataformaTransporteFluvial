const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioModel = new Schema(
    {
        nombre:{
            type: "string",
            required:true
        },
        apellido:{
            type: "string",
            required:true
        },
        email:{
            type: "string"
        },
        telefono:{
            type: "number",
            required:true
        },
        tipo_documento:{
            type: "string",
            required:true
        },
        documento:{
            type: "string",
            unique: true,
            required:true
        },
        password:{
            type: "string",
            required:true
        },
        perfil:{
            type: "string",
            required:true
        }
    }
);

module.exports = mongoose.model("usuario", usuarioModel);