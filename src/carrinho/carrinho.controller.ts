import { Request, Response } from "express";
import { db } from "../database/banco-moongo.js";
import { ObjectId } from "mongodb";

interface ItemCarrinho {
  produtoid: string;
  nome: string;
  quantidade: number;
  precoUnitario: number;
}

interface Carrinho {
  usuarioId: string;
  itens: ItemCarrinho[];
  total: number;
}
class CarrinhoController {

    //Para adicionar um item ao carrinho 
     async adicionar(req: Request, res: Response) {
    const { usuarioId, produtoId, quantidade } = req.body;

    const produto = await db.collection("produtos").findOne({ _id: new ObjectId(String(produtoId)) });
    if (!produto) return res.status(404).json({ message: "Produto não encontrado" });

    const item: ItemCarrinho = {
      produtoid: produtoId,
      nome: produto.nome,
      quantidade,
      precoUnitario: produto.preco,
    };

    const carrinho: Carrinho = {
      usuarioId,
      itens: [item],
      total: item.precoUnitario * item.quantidade,
    };

    const resultado = await db.collection("carrinhos").updateOne(
      { usuarioId },
      { $set: carrinho },
      { upsert: true }
    );

    res.status(201).json({ ...carrinho, _id: resultado.upsertedId });
  }
}

export default new CarrinhoController();