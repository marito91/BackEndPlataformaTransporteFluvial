const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const configuracionModel = new Schema(
    {
        descripcion:{
            type: "string",
            required:true
        },
        valor:{
            type: "number",
            required:true
        }
    }
);

module.exports = mongoose.model("configuracion", configuracionModel);