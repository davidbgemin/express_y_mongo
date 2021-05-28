import { Usuario } from '../models/usuario.model';
import { tareaSchema } from '../models/tarea.models';
import { model } from 'mongoose'

export const crearTarea = async (req, res) => {
    try {
        const Tarea = model('Tarea', tareaSchema);
        const id = req.params.userId;
        const usuario = await Usuario.findById(id);
        const nuevaTarea = new Tarea({...req.body, tareaEstado: 'por hacer'})
        usuario.tareas = [
            ...usuario.tareas,
            nuevaTarea
        ]
        const usuarioActualizado = await usuario.save()
        return res.json({
            success: true,
            content: nuevaTarea,
            message: 'Tarea agregada correctamente'
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            content: error,
            message: 'Error al añadir las tareas'
        })
    }

}

export const obtenerTareas = async (req, res) => {
    try {
        const id = req.params.userId
        const usuario = await Usuario.findById(id)
        return res.json({
            success: true,
            content: usuario.tareas,
            message: 'Tareas obtenidas correctamente'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            content: error,
            message: 'Error al obtener las tareas'
        })
    }
}