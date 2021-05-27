import {Router} from "express";
import * as usuario_controller from "../controllers/usuario.controller"

export const usuario_router = Router();

usuario_router.post("/registro", usuario_controller.registro)