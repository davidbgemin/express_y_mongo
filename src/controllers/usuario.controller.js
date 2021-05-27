import { Usuario } from "../models/usuario.model";
import { hashSync } from "bcrypt";

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

export const login = (req, res) => {}
export const mostrarUsuario = (req, res) => {}