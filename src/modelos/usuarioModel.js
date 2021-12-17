const { genSalt, hash } = require("bcryptjs");
const { model, Schema } = require("mongoose");

const usuarioSchema = new Schema(
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

usuarioSchema.pre("save", async function (next) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

const usuarioModel = model("usuario", usuarioSchema);

exports.usuarioModel = usuarioModel;