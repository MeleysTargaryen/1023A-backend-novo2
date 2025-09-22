import { Request, Response } from "express";
import { db } from "../database/banco-moongo";

class ProdutoController {
    async listar(req:Request, res:Response) {
        const produtos = await db.collection('estudantes').find().toArray();
        res.status(200).json(estudantes);
   }
}
export default new ProdutoController();