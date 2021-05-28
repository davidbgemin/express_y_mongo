import { Router } from 'express';
import * as tareaController from '../controllers/tarea.controller';
import {verificarUsuario} from '../middlewares/verifyUser'

const router = Router()

router.get('/tareas/:userId', verificarUsuario, tareaController.obtenerTareas);
router.post('/tareas/:userId', verificarUsuario, tareaController.crearTarea)

export default router