import usuarioController from "./usuarios/usuario.controller";
import { Router }   from "express";

const rotas = Router();

rotas.post("/usuarios", usuarioController.adicionar);
rotas.get("/usuarios", usuarioController.listar);
rotas.get("/produtos", produtoController.listar);
//Arrumar rota de produtos



export default rotas;