import usuarioController from "./usuarios/usuario.controller";
import { Router }   from "express";

const rotas = Router();

rotas.post("/usuarios", usuarioController.adicionar);
rotas.get("/usuarios", usuarioController.listar);

export default rotas;