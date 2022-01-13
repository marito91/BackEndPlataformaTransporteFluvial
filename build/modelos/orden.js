const {
  model,
  Schema
} = require("mongoose");

const ordenSchema = new Schema({
  order_id: {
    type: "number",
    required: true
  },
  fecha_origen_orden: {
    type: "string",
    required: true
  },
  nombre_contenedor: {
    type: "string",
    required: true
  },
  descripcion_contenedor: {
    type: "string",
    required: true
  },
  peso_contenedor: {
    type: "number",
    required: true
  },
  ancho_contenedor: {
    type: "number",
    required: true
  },
  alto_contenedor: {
    type: "number",
    required: true
  },
  largo_contenedor: {
    type: "number",
    required: true
  },
  puerto_origen: {
    type: "string",
    required: true
  },
  puerto_destino: {
    type: "string",
    required: true
  },
  estado_orden: {
    type: "string"
  },
  fecha_fin_orden: {
    type: "date"
  },
  costo: {
    type: "string",
    required: true
  },
  usuario: {
    type: "string",
    required: true
  }
});
const ordenModel = model("ordenes", ordenSchema);
exports.ordenModel = ordenModel;
//# sourceMappingURL=orden.js.map