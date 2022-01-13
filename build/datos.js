/**
 * Method: GET 
Route: /listarUsuario
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/
const usuarios = [{
  "numero_documento": "24526698",
  "nombre": "Pedro",
  "apellido": "Lopez",
  "perfil": 2,
  "celular": "31098442945",
  "email": "pedro.lopez@gmail.com"
}, {
  "numero_documento": "102234456",
  "nombre": "Juan Carlos",
  "apellido": "Gutierrez",
  "perfil": 2,
  "celular": "3208694311",
  "email": "gutijc@gmail.com"
}, {
  "numero_documento": "13009884",
  "nombre": "Maria",
  "apellido": "Arenas",
  "perfil": 1,
  "celular": "3145566787",
  "email": "marenas@gmail.com"
}, {
  "numero_documento": "108844532",
  "nombre": "Dario",
  "apellido": "Diaz",
  "perfil": 0,
  "celular": "3005782311",
  "email": "dario.diaz@gmail.com"
}];
exports.usuarios = usuarios;
/*

Method: GET 
Route: /listarPuerto
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const puertos = [{
  "id_puerto": 1,
  "nombre": "Puerto Carreño"
}, {
  "id_puerto": 2,
  "nombre": "Puerto Nariño"
}, {
  "id_puerto": 3,
  "nombre": "Puerto Banqueta"
}, {
  "id_puerto": 4,
  "nombre": "Puerto Cabuyo"
}, {
  "id_puerto": 5,
  "nombre": "Puerto López"
}, {
  "id_puerto": 6,
  "nombre": "Puerto Guaviare"
}, {
  "id_puerto": 7,
  "nombre": "Puerto Mitú"
}, {
  "id_puerto": 8,
  "nombre": "Puerto Yuruparí"
}, {
  "id_puerto": 9,
  "nombre": "Puerto Pucarón"
}, {
  "id_puerto": 10,
  "nombre": "Puerto Calamar"
}, {
  "id_puerto": 11,
  "nombre": "Puerto Inírida"
}, {
  "id_puerto": 12,
  "nombre": "Puerto Tumaco"
}, {
  "id_puerto": 13,
  "nombre": "Puerto Buenaventura"
}, {
  "id_puerto": 14,
  "nombre": "Puerto Salgar"
}, {
  "id_puerto": 15,
  "nombre": "Puerto Berrio"
}, {
  "id_puerto": 16,
  "nombre": "Puerto Barrancabermeja"
}, {
  "id_puerto": 17,
  "nombre": "Puerto Cartagena"
}, {
  "id_puerto": 18,
  "nombre": "Puerto Santa Marta"
}, {
  "id_puerto": 19,
  "nombre": "Puerto Barranquilla"
}, {
  "id_puerto": 20,
  "nombre": "Puerto Gamarra"
}];
exports.puertos = puertos;
/*
Method: GET 
Route: /listarOrdenDetalle/?id_orden=1002
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const ordenDetalle = {
  "id_orden": 0,
  "fecha_orden": "2021-10-13 10:21:44",
  "nombre_contenedor": "FFA5893",
  "descripción_contenedor": "Telas",
  "peso_contenedor": "22",
  "ancho_contenedor": "2.43",
  "alto_contenedor": "2.9",
  "largo_contenedor": "12.2",
  "puerto_origen": "Puerto Barranquilla",
  "puerto_destino": "Puerto Berrio",
  "estado_orden": "Finalizada",
  "fecha_fin_orden": "2021-10-28 11:05:01",
  "costo": 1520000
};
exports.ordenDetalle = ordenDetalle;
/*
Method: GET 
Route: /verCostoMilla
Headers: 
"Content-Type: application/json"

//Body Request:

//Body Response:
*/

let costo = {
  "valor": 150
};
exports.costo = costo;
/*
Method: GET 
Route: /listarDistanciaPuerto/?origen=Puerto_Carreño&destino=Puerto_Nariño
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const distanciaPuertos = {
  "nombre_origen": "Puerto_Carreño",
  "nombre_destino": "Puerto_Nariño",
  "distancia": 120
};
exports.distanciaPuertos = distanciaPuertos;
/*
Method: GET 
Route: /listarOrden
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const ordenes = [{
  "id_orden": 1,
  "articulo": "Joyas",
  "fecha_orden": "2021-10-12 14:30:25",
  "nombre_contenedor": "SKO4477",
  "puerto_origen": "Puerto Carreño",
  "puerto_destino": "Puerto Cabuyo",
  "estado_orden": "Finalizada"
}, {
  "id_orden": 2,
  "articulo": "Prendas",
  "fecha_orden": "2021-10-13 10:21:44",
  "nombre_contenedor": "FFA5893",
  "puerto_origen": "Puerto Barranquilla",
  "puerto_destino": "Puerto Berrio",
  "estado_orden": "Finalizada"
}, {
  "id_orden": 3,
  "articulo": "Televisores",
  "fecha_orden": "2021-11-30 17:44:30",
  "nombre_contenedor": "MIC1322",
  "puerto_origen": "Puerto Salgar",
  "puerto_destino": "Puerto Tumaco",
  "estado_orden": "Despachada"
}, {
  "id_orden": 4,
  "fecha_orden": "2021-11-30 17:44:30",
  "articulo": "Telas",
  "alto": 34,
  "ancho": 56,
  "largo": 32,
  "peso": 20,
  "nombre_contenedor": "MIC1322",
  "puerto_origen": "Puerto Santa Marta",
  "puerto_destino": "Puerto Cartagena",
  "descripcion": "Mercancia de telas",
  "estado_orden": "preparando para Embarcar"
}];
exports.ordenes = ordenes;
/*
Method: POST 
Route: /registrarUsuario
Headers: 
"Content-Type: application/json"

Body Request:
*/

const registroUsuario = {
  "numero_documento": "24526698",
  "nombre": "Pedro",
  "apellido": "Lopez",
  "perfil": 2,
  "celular": "31098442945",
  "email": "pedro.lopez@gmail.com",
  "password": "Pedro102030"
};
exports.registroUsuario = registroUsuario; // Body Response:

const usuarioRegistrado = {
  "codigo": "200",
  "descripcion": "Usuario registrado exitosamente"
};
exports.usuarioRegistrado = usuarioRegistrado;
/*
Method: POST 
Route: /registrarPuerto
Headers: 
"Content-Type: application/json"

Body Request:
*/

const registroPuerto = {
  "nombre_puerto_origen": "Puerto_Virginia",
  "nombre_puerto_destino": "Puerto_Carreño",
  "distancia": 1024
};
exports.registroPuerto = registroPuerto; // Body Response:

const puertoRegistrado = {
  "codigo": "200",
  "descripcion": "Puerto registrado exitosamente",
  "id_puerto": 21
};
exports.puertoRegistrado = puertoRegistrado;
/*
Method: POST 
Route: /registrarOrden
Headers: 
"Content-Type: application/json"

Body Request:
*/

const registroOrden = [{
  "id_orden": 0,
  "articulo": "Cargamento",
  "largo": 250,
  "ancho": 150,
  "alto": 150,
  "peso": 300,
  "puertoOrigen": "Puerto A",
  "PuertoDestino": "Puerto B",
  "Descripcion": "Descripcion Cargamento"
}];
exports.registroOrden = registroOrden; // Body Response:

const newOrden = {
  "orden": "200",
  "mensaje": "Orden creada exitosamente"
};
exports.newOrden = newOrden;
/*
Method: POST 
Route: /editarCostoMilla
Headers: 
"Content-Type: application/json"

Body Request:
*/

const costoMilla = {
  "valor": 181000
};
exports.costoMilla = costoMilla; //Body Response:

const costoUpdate = {
  "codigo": "200",
  "descripcion": "Valor milla actualizado exitosamente"
};
exports.costoUpdate = costoUpdate;
/*
Method: POST 
Route: /editarOrden
Headers: 
"Content-Type: application/json"

Body Request:
*/

const editarOrden = {
  "id_orden": 1004,
  "estado_orden": "Finalizada"
};
exports.editarOrden = editarOrden; // Body Response:

const ordenUpdate = {
  "codigo": "200",
  "descripcion": "Orden actualizada exitosamente"
};
exports.ordenUpdate = ordenUpdate;
/*
Method: POST 
Route: /login
Headers: 
"Content-Type: application/json"

Body Request:
*/

const login = {
  "usuario": 24526698,
  "password": "Pablo102030"
};
exports.login = login; // Body Response:

const loginUpdate = {
  "codigo": "200",
  "descripcion": "credenciales exitosas"
};
exports.loginUpdate = loginUpdate;
/*
Method: GET 
Route: /listarOrden/?estado=Finalizada
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const estados = [{
  "id_orden": 1001,
  "fecha_orden": "2021-10-12 14:30:25",
  "nombre_contenedor": "SKO4477",
  "puerto_origen": "Puerto Carreño",
  "puerto_destino": "Puerto Cabuyo",
  "estado_orden": "Finalizada"
}, {
  "id_orden": 1002,
  "fecha_orden": "2021-10-13 10:21:44",
  "nombre_contenedor": "FFA5893",
  "puerto_origen": "Puerto Barranquilla",
  "puerto_destino": "Puerto Berrio",
  "estado_orden": "Finalizada"
}];
exports.estados = estados;
/*
Method: GET 
Route: /listarPuertoDistancia
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const distancias = [{
  "id_puerto": 1,
  "nombre": "Puerto Carreño",
  "distancia": 220
}, {
  "id_puerto": 2,
  "nombre": "Puerto Nariño",
  "distancia": 300
}, {
  "id_puerto": 3,
  "nombre": "Puerto Banqueta",
  "distancia": 270
}, {
  "id_puerto": 4,
  "nombre": "Puerto Cabuyo",
  "distancia": 140
}, {
  "id_puerto": 5,
  "nombre": "Puerto López",
  "distancia": 200
}, {
  "id_puerto": 6,
  "nombre": "Puerto Guaviare",
  "distancia": 100
}, {
  "id_puerto": 7,
  "nombre": "Puerto Mitú",
  "distancia": 150
}, {
  "id_puerto": 8,
  "nombre": "Puerto Yuruparí",
  "distancia": 180
}, {
  "id_puerto": 9,
  "nombre": "Puerto Pucarón",
  "distancia": 220
}, {
  "id_puerto": 10,
  "nombre": "Puerto Calamar",
  "distancia": 190
}, {
  "id_puerto": 11,
  "nombre": "Puerto Inírida",
  "distancia": 170
}, {
  "id_puerto": 12,
  "nombre": "Puerto Tumaco",
  "distancia": 80
}, {
  "id_puerto": 13,
  "nombre": "Puerto Buenaventura",
  "distancia": 230
}, {
  "id_puerto": 14,
  "nombre": "Puerto Salgar",
  "distancia": 110
}, {
  "id_puerto": 15,
  "nombre": "Puerto Berrio",
  "distancia": 180
}, {
  "id_puerto": 16,
  "nombre": "Puerto Barrancabermeja",
  "distancia": 240
}, {
  "id_puerto": 17,
  "nombre": "Puerto Cartagena",
  "distancia": 90
}, {
  "id_puerto": 18,
  "nombre": "Puerto Santa Marta",
  "distancia": 150
}, {
  "id_puerto": 19,
  "nombre": "Puerto Barranquilla",
  "distancia": 100
}, {
  "id_puerto": 20,
  "nombre": "Puerto Gamarra",
  "distancia": 190
}];
exports.distancias = distancias;
//# sourceMappingURL=datos.js.map