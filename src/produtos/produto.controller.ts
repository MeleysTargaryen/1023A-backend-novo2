import { Request, Response } from "express";
import { db } from "../database/banco-moongo.js";

class ProdutoController {
  
  async listar(req: Request, res: Response) {
    const produtos = await db.collection("produtos").find().toArray();
    res.status(200).json(produtos);
  }

  async adicionar(req: Request, res: Response) {
    const { nome, preco, foto, descricao } = req.body;
    const produto = { nome, preco, foto, descricao };
    const resposta = await db.collection("produtos").insertOne(produto);
    res.status(201).json({ ...produto, _id: resposta.insertedId });
  }
}

export default new ProdutoController();



