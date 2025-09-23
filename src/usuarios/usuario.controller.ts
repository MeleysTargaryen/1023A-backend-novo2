import { Request, Response } from "express";
import { db } from "../database/banco-moongo.js";

class UsuarioController {
    async adicionar(req:Request, res:Response) {
            const Usuario = req.body;
            const resultado = await db.collection('usuarios').insertOne(Usuario);
            res.status(201).json({ ...Usuario, _id: resultado.insertedId });
        }
    async listar(req:Request, res:Response) {
        const usuarios = await db.collection('usuarios').find().toArray();
        res.status(200).json(usuarios);
   }
}
export default new UsuarioController();