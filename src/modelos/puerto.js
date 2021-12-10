const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const puertoModel = new Schema(
    {
		_id:{
			unique: true,
            type: "number",
            required:true
        },
        nombre_puerto:{
            type: "string",
            required:true
        },
        distancia:{
            type: "number"
        }
    }
);

module.exports = mongoose.model("puerto", puertoModel);