const {
  Router
} = require("express");

const userRutas = Router();

const {
  usuarioModel
} = require("../modelos/usuarioModel");

const Usuario = require("../modelos/usuarioModel");

const {
  compare
} = require("bcryptjs");

const {
  sign
} = require("jsonwebtoken"); //const { userGuard } = require("../guards/userGuard");


const {
  login,
  loginUpdate,
  registroUsuario,
  usuarioRegistrado,
  usuarios
} = require("../datos");
/**
* API Rest Modulo de Login
* Descripcion: Indica el ingreso de los usuarios a la plataforma.
* Ruta: /login
* Metodo: POST
* Headers:"Content-Type: application/json"
* Datos de entrada: { login }
* Respuesta: { loginUpdate }
*/


userRutas.post("/login", async function (req, res) {
  //Capturar usuario / password
  const {
    usuario,
    password
  } = req.body; // Comprobar el usuario exista en BD

  const user = await usuarioModel.findOne({
    documento: usuario
  });

  if (!user) {
    return res.status(401).json({
      estado: "error",
      msg: "ERROR: Credenciales inválidas. 1"
    });
  } // Comparar la contraseña 


  const passOK = await compare(password, user.password);

  if (passOK === true) {
    const token = sign({
      usuario: user.documento,
      rol: user.perfil,
      nombre: user.nombre
    }, process.env.JWT_SECRET_KEY);
    return res.status(200).json({
      estado: "ok",
      msg: "Logueado",
      token,
      url: "/inicio"
    });
  }

  return res.status(401).json({
    estado: "error",
    msg: "ERROR: Credenciales inválidas. 2"
  }); // Dar/denegar acceso
});
/**
 * API Rest Modulo de registro de usuarios
 * Descripcion: Registra los usuarios a la plataforma
 * Ruta: /registrarUsuario
 * Metodo: POSTs
 * Headers:"Content-Type: application/json"
 * Datos de entrada:  { registroUsuario }
 * Respuesta: { usuarioRegistrado }
 */

userRutas.post("/registrarUsuario", function (req, res) {
  /* Codigo Local NO DATABASE
     // Se recibe un json con toda la informacion respectiva para crear un usuario nuevo
     const {nom, lastName, documentType, document, emailAddress, userType, phone, password} = req.body;
     // Se obtiene el numero de documento para revisar si el usuario ya existe
     const id = req.body.document;
     // Se hace una busqueda del documento para ver si ya existe
     const oldUser = usuarios.find(u => u.numero_documento === id);
     // Si el usuario ya existe envia una alerta 
     if (oldUser != null && oldUser != undefined) {
         res.send({estado : "error", msg : "El usuario ya se encuentra registrado en el sistema."});
     } else { // de lo contrario:
         // Se determina el tipo de perfil segun la informacion que recibe
         if (userType === 'Item 2') {
             profile = 1;
         } else if (userType === 'Item 3') {
             profile = 2;
         }
         // Se determina el tipo de documento segun la informacion que recibe
         if (documentType === 'Item 2') {
             idType = "C.C";
         } else if (documentType === 'Item 3') {
             idType = "C.E";
         } else if (documentType === 'Item 4') {
             idType = "NIT";
         }
         // Se crea una variable newUser donde a cada Key se le asigna los valores que vienen del json del front end
         const newUser = {nombre: nom, apellido: lastName, tipo_documento: idType, numero_documento: document, email: emailAddress, perfil: profile, celular: phone, pass: password};
         // Se agrega el newUser a base de datos
         usuarios.push(newUser);
         // Se confirma que se estan recibiendo todos los datos correspondientes
         console.log(usuarios);
         // Se envia estado y mensaje al front end para confirmar que el usuario se registro
         res.send({estado : "ok", msg : "Usuario Registrado"});
     }
     */
  // Aqui inicia el codigo con base de datos
  // Se recibe un json con toda la informacion respectiva para crear un usuario nuevo
  const {
    nom,
    lastName,
    documentType,
    document,
    emailAddress,
    userType,
    phone,
    password
  } = req.body; // Se determina el tipo de perfil segun la informacion que recibe

  if (userType === 'Item 2') {
    profile = "1";
  } else if (userType === 'Item 3') {
    profile = "2";
  } // Se determina el tipo de documento segun la informacion que recibe


  if (documentType === 'Item 2') {
    idType = "C.C";
  } else if (documentType === 'Item 3') {
    idType = "C.E";
  } else if (documentType === 'Item 4') {
    idType = "NIT";
  } // Se hace una busqueda del documento para ver si ya existe


  usuarioModel.findOne({
    documento: document
  }, function (error, oldUser) {
    if (error) {
      return res.send({
        estado: "error",
        msg: "ERROR: al buscar usuario"
      });
    } else {
      if (oldUser !== null) {
        return res.send({
          estado: "ok",
          msg: "Error: El usuario ya se encuentra registrado en el sistema."
        });
      } else {
        // Se crea un nuevo usuario con una instancia del modelo de usuario y se le agrega toda la informacion que viene del front
        const newUser = new usuarioModel({
          nombre: nom,
          apellido: lastName,
          tipo_documento: idType,
          documento: document,
          email: emailAddress,
          perfil: profile,
          telefono: phone,
          password: password
        });
        newUser.save(function (error) {
          if (error) {
            return res.send({
              estado: "error",
              msg: "ERROR: Al registrar nuevo usuario."
            });
          }

          res.send({
            estado: "ok",
            msg: "Usuario registrado exitosamente."
          });
        });
      }
    }
  });
});
/**
 * API Rest Modulo de listar usuarios
 * Descripcion: Buscar los usuarios y muestra la información de ellos
 * Ruta: /listarUsuario
 * Metodo: GET
 * Headers:"Content-Type: application/json"
 * Datos de respuesta: { usuarios }
 */

userRutas.get("/listarUsuario/:documento", function (req, res) {
  let alerta = "No se encontró el usuario solicitado";
  let estado = "error";
  const document = req.params.documento; //Viene un json {numero_documento:"24526698"}
  // Se hace una busqueda del documento para ver si ya existe

  usuarioModel.findOne({
    documento: document
  }, function (error, oldUser) {
    if (error) {
      return res.send({
        estado: "error",
        msg: "ERROR: al buscar usuario"
      });
    } else {
      if (oldUser !== null && oldUser != undefined) {
        alerta = "Usuario encontrado exitosamente";
        estado = "ok";
        return res.send({
          estado: estado,
          msg: alerta,
          data: oldUser
        });
      } else {
        return res.send({
          estado: estado,
          msg: alerta,
          data: oldUser
        });
      }
    }
  });
});
/**
 * API Rest Modulo de editar usuarios
 * Descripcion: Busca los usuarios y actualiza la información de ellos
 * Ruta: /editarUsuario
 * Metodo: POST
 * Headers:"Content-Type: application/json"
 * Datos de entrada: {nom, lastName, documentType, document, emailAddress, userType, phone, password}
 * Datos de respuesta: {estado : "ok", mensaje : "Usuario Guardado"}
 */

userRutas.post("/editarUsuario", function (req, res) {
  /*
      // Desestructuracion
      const {nom, lastName, documentType, document, emailAddress, userType, phone, password} = req.body;
      // Se hacen las alertas predeterminadas
      let alerta = "error";
      let mensaje = "El usuario no se encuentra registrado en nuestra base de datos"
      let i = 0;
      for (const u of usuarios) {
          if (u.numero_documento.toLowerCase() == document.toLowerCase()) {
              // Se hacen las respectivas validaciones con la informacion que viene de los SELECT FIELDS
              if (userType === 'Item 2') {
                  profile = 1;
              } else if (userType === 'Item 3') {
                  profile = 2;
              }
              // Se determina el tipo de documento segun la informacion que recibe
              if (documentType === 'Item 2') {
                  idType = "C.C";
              } else if (documentType === 'Item 3') {
                  idType = "C.E";
              } else if (documentType === 'Item 4') {
                  idType = "NIT";
              }
              // Actualiza el producto con los nuevos datos
              usuarios[i].nombre = nom; // Se modifican los datos almacenados con los que trae el json 
              usuarios[i].apellido = lastName; // Se modifican los datos almacenados con los que trae el json 
              usuarios[i].tipo_documento = idType; // Se modifican los datos almacenados con los que trae el json 
              usuarios[i].numero_documento = document; // Se modifican los datos almacenados con los que trae el json 
              usuarios[i].email = emailAddress; // Se modifican los datos almacenados con los que trae el json 
              usuarios[i].perfil = profile; // Se modifican los datos almacenados con los que trae el json 
              usuarios[i].celular = phone; // Se modifican los datos almacenados con los que trae el json 
              usuarios[i].pass = password; // Se modifican los datos almacenados con los que trae el json - ESTE SE DEBE AJUSTAR CUANDO SE HAGA LA AUTENTICACION
              alerta = "ok";
              mensaje = "Usuario editado exitosamente"
              break;            
          }
          i++;
      }
      res.send({estado : alerta, msg : mensaje});
  */
  // Se trae la informacion del Front
  const {
    nom,
    lastName,
    documentType,
    document,
    emailAddress,
    userType,
    phone,
    password
  } = req.body; // Se identifican los valores de tipo de usuario y tipo de documento

  if (userType === 'Item 2') {
    profile = "1";
  } else if (userType === 'Item 3') {
    profile = "2";
  } // Se determina el tipo de documento segun la informacion que recibe


  if (documentType === 'Item 2') {
    idType = "C.C";
  } else if (documentType === 'Item 3') {
    idType = "C.E";
  } else if (documentType === 'Item 4') {
    idType = "NIT";
  }

  usuarioModel.findOne({
    documento: document
  }, function (error, oldUser) {
    if (error) {
      return res.send({
        estado: "error",
        msg: "ERROR: al buscar usuario"
      });
    } else {
      if (oldUser !== null && oldUser !== undefined) {
        usuarioModel.updateOne({
          documento: document
        }, {
          $set: {
            nombre: nom,
            apellido: lastName,
            tipo_documento: idType,
            documento: document,
            email: emailAddress,
            perfil: profile,
            telefono: phone
            /*password: password*/

          }
        }, function (error) {
          if (error) {
            return res.send({
              estado: "error",
              msg: "ERROR: Al editar el usuario"
            });
          } else {
            res.send({
              estado: "ok",
              msg: "Usuario editado"
            });
          }
        });
      }
    }
  });
});
/**
 * API Rest Modulo de eliminacion de Usuarios (se ajusta a BD)
 * Descripcion: Elimina un usuario guardado en la base de datos.
 * Ruta: /eliminarUsuario
 * Metodo: POST
 * Datos de entrada: { document }
 * Respuesta: {estado : "ok", mensaje : "Usuario Eliminado"}
 */

userRutas.post("/eliminarUsuario", function (req, res) {
  /* Codigo para eliminar usuario local
  // Desestructuracion
  const { document } = req.body;
  // Buscar el usuario a Eliminar
  let i = 0;
  for (const u of usuarios) {
      if (u.numero_documento.toLowerCase() == document.toLowerCase()) {
          usuarios.splice(i, 1);
          break;
      }
      i++;
  }
  res.send({estado : "ok", msg : "Usuario Eliminado"});
  */
  // Codigo para eliminar usuario en base de datos
  // Desestructuracion
  const {
    document
  } = req.body;
  usuarioModel.findOne({
    documento: document
  }, function (error, oldUser) {
    if (error) {
      return res.send({
        estado: "error",
        msg: "ERROR: al buscar usuario"
      });
    } else {
      if (oldUser !== null && oldUser !== undefined) {
        usuarioModel.remove({
          documento: document
        }, function (error) {
          if (error) {
            return res.send({
              estado: "error",
              msg: "ERROR: Al eliminar el usuario"
            });
          } else {
            res.send({
              estado: "ok",
              msg: "Usuario eliminado exitosamente."
            });
          }
        });
      }
    }
  });
});
exports.userRutas = userRutas;
//# sourceMappingURL=userRutas.js.map