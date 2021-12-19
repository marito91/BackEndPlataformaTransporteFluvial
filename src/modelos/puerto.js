const { model, Schema } = require("mongoose");


const puertoSchema = new Schema(
    {
		/*_id:{
			unique: true,
            type: "number",
            required:true
        },*/
        nombre_puerto:{
            type: "string",
            required:true
        },
        distancia:{
            type: "number"
        },
        puerto_id:{
            type: "number",
        }

    }
);

const puertoModel = model("puertos", puertoSchema);

exports.puertoModel = puertoModel;