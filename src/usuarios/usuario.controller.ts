import { Request, Response } from "express";
import { db } from "../database/banco-moongo";

class UsuarioController {
    async adicionar(req:Request, res:Response) {
            const Estudante = req.body;
            const resultado = await db.collection('estudantes').insertOne(Estudante);
            res.status(201).json({ ...Estudante, _id: resultado.insertedId });
        }
    async listar(req:Request, res:Response) {
        const estudantes = await db.collection('estudantes').find().toArray();
        res.status(200).json(estudantes);
   }
}
export default new UsuarioController();