const { model, Schema } = require("mongoose");

const configuracionSchema = new Schema(
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


const configModel = model("configuraciones", configuracionSchema);

exports.configModel = configModel;