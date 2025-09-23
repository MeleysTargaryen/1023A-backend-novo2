import { Request, Response } from "express";
import { db } from "../database/banco-moongo";

class ProdutoController {
  
  async listar(req: Request, res: Response) {
    try {
      const produtos = await db.collection("produtos").find().toArray();
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar produtos" });
    }
  }

  
  async adicionar (req: Request, res: Response) {
    try {
      const { nome, preco, foto, descricao } = req.body;
      

      const quantidade = await db.collection("produtos").countDocuments();
      const novoId = quantidade + 1;

      const novoProduto = {
        id: novoId,
        nome,
        preco: Number(preco),
        foto,
        descricao,
        dataCriacao: new Date()
      };

      await db.collection("produtos").insertOne(novoProduto);
      
   
      const produtos = await db.collection("produtos").find().toArray();
      res.status(201).json(produtos);
      
    } catch (error) {
      res.status(500).json({ erro: "Erro ao criar produto" });
    }
  }
}

export default new ProdutoController();


