/**
 * Method: GET 
Route: /listarUsuario
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const usuarios = [
   {
      "numero_documento":"24526698",
      "nombre":"Pedro",
      "apellido":"Lopez",
      "perfil":2,
      "celular":"31098442945",
      "email":"pedro.lopez@gmail.com"
   },
   {
      "numero_documento":"102234456",
      "nombre":"Juan Carlos",
      "apellido":"Guitierrez",
      "perfil":2,
      "celular":"3208694311",
      "email":"gutijc@gmail.com"
   },
   {
      "numero_documento":"13009884",
      "nombre":"Maria",
      "apellido":"Arenas",
      "perfil":1,
      "celular":"3145566787",
      "email":"marenas@gmail.com"
   },
   {
      "numero_documento":"108844532",
      "nombre":"Dario",
      "apellido":"Diaz",
      "perfil":0,
      "celular":"3005782311",
      "email":"dario.diaz@gmail.com"
   }
]

exports.usuarios = usuarios;

/*

Method: GET 
Route: /listarPuerto
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const puertos = [
   {
      "id_puerto":1,
      "nombre":"Puerto_Carreño"
   },
   {
      "id_puerto":2,
      "nombre":"Puerto_Nariño"
   },
   {
      "id_puerto":3,
      "nombre":"Puerto_Banqueta"
   },
   {
      "id_puerto":4,
      "nombre":"Puerto_Cabuyo"
   }
   ,
   {
      "id_puerto":5,
      "nombre":"Puerto_López"
   }
   ,
   {
      "id_puerto":6,
      "nombre":"Puerto_Guaviare"
   }
   ,
   {
      "id_puerto":7,
      "nombre":"Puerto_Mitú"
   }
   ,
   {
      "id_puerto":8,
      "nombre":"Puerto_Yuruparí"
   }
   ,
   {
      "id_puerto":9,
      "nombre":"Puerto_Pucarón"
   }
   ,
   {
      "id_puerto":10,
      "nombre":"Puerto_Calamar"
   }
   ,
   {
      "id_puerto":11,
      "nombre":"Puerto_Inírida"
   }
   ,
   {
      "id_puerto":12,
      "nombre":"Puerto_Tumaco"
   }
   ,
   {
      "id_puerto":13,
      "nombre":"Puerto_Buenaventura"
   }
   ,
   {
      "id_puerto":14,
      "nombre":"Puerto_Salgar"
   }
   ,
   {
      "id_puerto":15,
      "nombre":"Puerto_Berrio"
   }
   ,
   {
      "id_puerto":16,
      "nombre":"Puerto_Barrancabermeja"
   }
   ,
   {
      "id_puerto":17,
      "nombre":"Puerto_Cartagena"
   }
   ,
   {
      "id_puerto":18,
      "nombre":"Puerto_Santa_Marta"
   }
   ,
   {
      "id_puerto":19,
      "nombre":"Puerto_Barranquilla"
   }
   ,
   {
      "id_puerto":20,
      "nombre":"Puerto_Gamarra"
   }
]

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
  "id_orden":1002,
  "fecha_orden":"2021-10-13 10:21:44",
  "nombre_contenedor":"FFA5893",
  "descripción_contenedor":"Telas",	  
  "peso_contenedor":"22",
  "ancho_contenedor":"2.43",
  "alto_contenedor":"2.9",
  "largo_contenedor":"12.2",
  "puerto_origen":"Puerto Barranquilla",
  "puerto_destino":"Puerto Berrio",
  "estado_orden":"Finalizada",
  "fecha_fin_orden":"2021-10-28 11:05:01",
  "costo": 1520000
}

exports.ordenDetalle = ordenDetalle;

/*
Method: GET 
Route: /verCostoMilla
Headers: 
"Content-Type: application/json"

//Body Request:

//Body Response:
*/

const costo = [{
    "id":"a", 
    "valor":124000
},{
    "id":"b", 
    "valor":256000
},{
    "id":"c", 
    "valor":320000
}]
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
  "nombre_origen":"Puerto_Carreño",
  "nombre_destino":"Puerto_Nariño",
  "distancia":120
}

exports.distanciaPuertos = distanciaPuertos;

/*
Method: GET 
Route: /listarOrden
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const ordenes = [
   {
      "id_orden":1001,
	  "fecha_orden":"2021-10-12 14:30:25",
	  "nombre_contenedor":"SKO4477",
      "puerto_origen":"Puerto Carreño",
	  "puerto_destino":"Puerto Cabuyo",
	  "estado_orden":"Finalizada"
   },
   {
      "id_orden":1002,
	  "fecha_orden":"2021-10-13 10:21:44",
	  "nombre_contenedor":"FFA5893",
      "puerto_origen":"Puerto Barranquilla",
	  "puerto_destino":"Puerto Berrio",
	  "estado_orden":"Finalizada"
   },
   {
      "id_orden":1003,
	  "fecha_orden":"2021-11-30 17:44:30",
	  "nombre_contenedor":"MIC1322",
      "puerto_origen":"Puerto Salgar",
	  "puerto_destino":"Puerto Tumaco",
	  "estado_orden":"Desspachada"
   }
]

exports.ordenes = ordenes;

/*
Method: POST 
Route: /registrarUsuario
Headers: 
"Content-Type: application/json"

Body Request:
*/

const registroUsuario = {
  "numero_documento":"24526698",
  "nombre":"Pedro",
  "apellido":"Lopez",
  "perfil":2,
  "celular":"31098442945",
  "email":"pedro.lopez@gmail.com",
  "password":"Pedro102030"
}

exports.registroUsuario = registroUsuario;

// Body Response:

const usuarioRegistrado = {
  "codigo": "200",
  "descripcion": "Usuario registrado exitosamente"
}

exports.usuarioRegistrado = usuarioRegistrado;

/*
Method: POST 
Route: /registrarPuerto
Headers: 
"Content-Type: application/json"

Body Request:
*/

const registroPuerto = {
	  "nombre_puerto_origen":"Puerto_Virginia",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia": 1024
}

exports.registroPuerto = registroPuerto;

// Body Response:

const puertoRegistrado = {
  "codigo": "200",
  "descripcion": "Puerto registrado exitosamente",
  "id_puerto":21,
}

exports.puertoRegistrado = puertoRegistrado;

/*
Method: POST 
Route: /editarCostoMilla
Headers: 
"Content-Type: application/json"

Body Request:
*/

const costoMilla = {
	  "valor": 181000
}

exports.costoMilla = costoMilla;

//Body Response:

const costoUpdate = {
  "codigo": "200",
  "descripcion": "Valor milla actualizado exitosamente"
}

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
}

exports.editarOrden = editarOrden;

// Body Response:

const ordenUpdate = {
  "codigo": "200",
  "descripcion": "Orden actualizada exitosamente"
}

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
}

exports.login = login;

// Body Response:

const loginUpdate = {
  "codigo": "200",
  "descripcion": "credenciales exitosas"
}

exports.loginUpdate = loginUpdate

/*
Method: GET 
Route: /listarOrden/?estado=Finalizada
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/
const estados = [
   {
      "id_orden":1001,
	  "fecha_orden":"2021-10-12 14:30:25",
	  "nombre_contenedor":"SKO4477",
      "puerto_origen":"Puerto Carreño",
	  "puerto_destino":"Puerto Cabuyo",
	  "estado_orden":"Finalizada"
   },
   {
      "id_orden":1002,
	  "fecha_orden":"2021-10-13 10:21:44",
	  "nombre_contenedor":"FFA5893",
      "puerto_origen":"Puerto Barranquilla",
	  "puerto_destino":"Puerto Berrio",
	  "estado_orden":"Finalizada"
   },
]

exports.estados = estados;

/*
Method: GET 
Route: /listarPuertoDistancia
Headers: 
"Content-Type: application/json"

Body Request:

Body Response:
*/

const distancias = [
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":172
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":172
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Cabuyo",
	  "distancia":164
   },
   {
      "nombre_puerto_origen":"Puerto_Cabuyo",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":164
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_López",
	  "distancia":190
   },
   {
      "nombre_puerto_origen":"Puerto_López",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":190
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Guaviare",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Guaviare",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Mitú",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Mitú",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Yuruparí",
	  "distancia":198
   },
   {
      "nombre_puerto_origen":"Puerto_Yuruparí",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":198
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Pucarón",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Pucarón",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Calamar",
	  "distancia":154
   },
   {
      "nombre_puerto_origen":"Puerto_Calamar",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":154
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Inírida",
	  "distancia":160
   },
   {
      "nombre_puerto_origen":"Puerto_Inírida",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":160
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Tumaco",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Tumaco",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Buenaventura",
	  "distancia":206
   },
   {
      "nombre_puerto_origen":"Puerto_Buenaventura",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":206
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Salgar",
	  "distancia":211
   },
   {
      "nombre_puerto_origen":"Puerto_Salgar",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":211
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Berrio",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Berrio",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Barrancabermeja",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Barrancabermeja",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Cartagena",
	  "distancia":207
   },
   {
      "nombre_puerto_origen":"Puerto_Cartagena",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":207
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Santa_Marta",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Santa_Marta",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Barranquilla",
	  "distancia":210
   },
   {
      "nombre_puerto_origen":"Puerto_Barranquilla",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":210
   },
   {
      "nombre_puerto_origen":"Puerto_Carreño",
	  "nombre_puerto_destino":"Puerto_Gamarra",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_Gamarra",
	  "nombre_puerto_destino":"Puerto_Carreño",
	  "distancia":186
   },  
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":157
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":157
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Cabuyo",
	  "distancia":176
   },
   {
      "nombre_puerto_origen":"Puerto_Cabuyo",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":176
   },
    {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_López",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_López",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Guaviare",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Guaviare",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Mitú",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_Mitú",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":186
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Yuruparí",
	  "distancia":191
   },
   {
      "nombre_puerto_origen":"Puerto_Yuruparí",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":191
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Pucarón",
	  "distancia":221
   },
   {
      "nombre_puerto_origen":"Puerto_Pucarón",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":221
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Calamar",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Calamar",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Inírida",
	  "distancia":208
   },
   {
      "nombre_puerto_origen":"Puerto_Inírida",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":208
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Tumaco",
	  "distancia":212
   },
   {
      "nombre_puerto_origen":"Puerto_Tumaco",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":212
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Buenaventura",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Buenaventura",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Salgar",
	  "distancia":175
   },
   {
      "nombre_puerto_origen":"Puerto_Salgar",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":175
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Berrio",
	  "distancia":187
   },
   {
      "nombre_puerto_origen":"Puerto_Berrio",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":187
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Barrancabermeja",
	  "distancia":189
   },
   {
      "nombre_puerto_origen":"Puerto_Barrancabermeja",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":189
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Cartagena",
	  "distancia":203
   },
   {
      "nombre_puerto_origen":"Puerto_Cartagena",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":203
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Santa_Marta",
	  "distancia":205
   },
   {
      "nombre_puerto_origen":"Puerto_Santa_Marta",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":205
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Barranquilla",
	  "distancia":211
   },
   {
      "nombre_puerto_origen":"Puerto_Barranquilla",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":211
   },
   {
      "nombre_puerto_origen":"Puerto_Nariño",
	  "nombre_puerto_destino":"Puerto_Gamarra",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Gamarra",
	  "nombre_puerto_destino":"Puerto_Nariño",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Cabuyo",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Cabuyo",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_López",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_López",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":220
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Guaviare",
	  "distancia":204
   },
   {
      "nombre_puerto_origen":"Puerto_Guaviare",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":204
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Mitú",
	  "distancia":177
   },
   {
      "nombre_puerto_origen":"Puerto_Mitú",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":177
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Yuruparí",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Yuruparí",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Pucarón",
	  "distancia":198
   },
   {
      "nombre_puerto_origen":"Puerto_Pucarón",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":198
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Calamar",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Calamar",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Inírida",
	  "distancia":156
   },
   {
      "nombre_puerto_origen":"Puerto_Inírida",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":156
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Tumaco",
	  "distancia":166
   },
   {
      "nombre_puerto_origen":"Puerto_Tumaco",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":166
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Buenaventura",
	  "distancia":240
   },
   {
      "nombre_puerto_origen":"Puerto_Buenaventura",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":240
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Salgar",
	  "distancia":219
   },
   {
      "nombre_puerto_origen":"Puerto_Salgar",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":219
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Berrio",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Berrio",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":199
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Barrancabermeja",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Barrancabermeja",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":202
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Cartagena",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Cartagena",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":188
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Santa_Marta",
	  "distancia":190
   },
   {
      "nombre_puerto_origen":"Puerto_Santa_Marta",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":190
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Barranquilla",
	  "distancia":194
   },
   {
      "nombre_puerto_origen":"Puerto_Barranquilla",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":194
   },
   {
      "nombre_puerto_origen":"Puerto_Banqueta",
	  "nombre_puerto_destino":"Puerto_Gamarra",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Gamarra",
	  "nombre_puerto_destino":"Puerto_Banqueta",
	  "distancia":201
   },
   {
      "nombre_puerto_origen":"Puerto_Cabuyo",
	  "nombre_puerto_destino":"Puerto_López",
	  "distancia":175
   },
   {
      "nombre_puerto_origen":"Puerto_López",
	  "nombre_puerto_destino":"Puerto_Cabuyo",
	  "distancia":175
   }
]

exports.distancias = distancias;