import { Usuario } from "../models/usuario.model";
import { hashSync, compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';
require('dotenv').config;

export const registro = async (req, res) => {
    // hay tres formas de hacer una creación (en este caso se usará la primera):
        // * 1ra forma:
    const objUsuario = new Usuario(req.body);
    // *Aca encriptamos la contraseña
    const pwdHash = hashSync(req.body.password, 10);
    objUsuario.password = pwdHash;
    //  * Fin de la encriptación
    // ? La 1ra forma todavçia no guarda en la bd, solamente construye el objeto, luego tendremos que llamar a su método .save() para que recién guarde en el bd
    try {
        const nuevoUsuario = await objUsuario.save();
        return res.status(201).json({
          success: true,
          content: nuevoUsuario,
          message: "Usuario creado exitosamente",
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          content: error,
          message: "error al guardar el usuario",
        });
      }
        // * 2da forma:
    // const nuevoUsuario = await Usuario.create(req.body)
        // * 3ra forma:
        // insertar varios registros
    // Usuario.insertMany([
    //     {
    //         usuarioNombre : "David",
    //         usuarioApellido : "Baila"
    //     },
    //     {
    //         usuarioNombre : "Pedro",
    //         usuarioApellido : "Baila"
    //     },
    //     {
    //         usuarioNombre : "María",
    //         usuarioApellido : "Baila"
    //     }
    // ])
}

export const login = async (req, res) => {
  const {email, password} = req.body;
  const usuario = await Usuario.findOne({
    usuarioCorreo: email
  })
  // * PRIMERA FORMA:
  // ? SELECT * FROM USUARIO WHERE EMAIL LIKE '%davidbgemin%'
  // await Usuario.findOne({
    // usuarioCorreo: {$regex: ".*" + email + "*."}
  // })
  // * SEGUNDA FORMA:
  // await Usuario.where({
    // usuarioCorreo: email
  // })
  // * TERCERA FORMA:
  // ? encuentrame todos los usuarios cuyo correo sea email y su fecha de naciemiento sea mayor que 2000-01-01
  // await Usuario.where("usuarioCorreo").equals(email).where("usuarioFechaNacimiento").gt("2000-01-01")
  if (!usuario) {
    return res.status(404).json({
      success: false,
      content: null,
      message: "usuario no encontrado"
    })
  }
  const resultado = compareSync(password, usuario.usuarioPassword);
  if (resultado) {
    const token = jwt.sign({_id: usuario._id}, process.env.JWT_SECRET, {
      // medido en segundos:
      expiresIn: 86400,
    })
    // TODO: implementar JWT
    return res.json({
      success: true,
      content: token,
      message: 'bienvenido'
    })
  } else {
    return res.status(401).json({
      success: false,
      content: null,
      message: 'credenciales incorrectas'
    })
  }

}
export const mostrarUsuario = (req, res) => {}