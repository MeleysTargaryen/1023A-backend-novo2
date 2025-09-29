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
  // GET -> Buscar carrinho por usuário
  async getCarrinho(req: Request, res: Response) {
    const { usuarioId } = req.params;
    if (!usuarioId) {
      return res.status(400).json({ message: "usuarioId é obrigatório" });
    }
    const carrinho = await db.collection<Carrinho>("carrinhos").findOne({ usuarioId });

    if (!carrinho) return res.status(404).json({ message: "Carrinho não encontrado" });

    res.json(carrinho);
  }

  // POST -> Criar carrinho (um por usuário)
  async adicionar(req: Request, res: Response) {
  const { usuarioId, produtoId, quantidade } = req.body;

  const produto = await db.collection("produtos").findOne({ _id: new ObjectId(String(produtoId)) });
  if (!produto) return res.status(404).json({ message: "Produto não encontrado" });

  const carrinho = await db.collection<Carrinho>("carrinhos").findOne({ usuarioId });

  const novoItem: ItemCarrinho = {
    produtoid: produtoId,
    nome: produto.nome,
    quantidade,
    precoUnitario: produto.preco,
  };

  if (carrinho) {
    const itemExistente = carrinho.itens.find(i => i.produtoid === produtoId);
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.itens.push(novoItem);
    }

 
    carrinho.total = carrinho.itens.reduce((acc, i) => acc + i.precoUnitario * i.quantidade, 0);

    await db.collection("carrinhos").updateOne({ usuarioId }, { $set: carrinho });
    return res.status(200).json(carrinho);
  }

  const novoCarrinho: Carrinho = {
    usuarioId,
    itens: [novoItem],
    total: novoItem.precoUnitario * novoItem.quantidade,
  };

  await db.collection("carrinhos").insertOne(novoCarrinho);
  res.status(201).json(novoCarrinho);
}

  // PUT -> Atualizar quantidade de um produto no carrinho
  async atualizarItem(req: Request, res: Response) {
    const { usuarioId, produtoId, quantidade } = req.body;

    const carrinho = await db.collection<Carrinho>("carrinhos").findOne({ usuarioId });
    if (!carrinho) return res.status(404).json({ message: "Carrinho não encontrado" });

    const itemIndex = carrinho.itens.findIndex(i => i.produtoid === produtoId);
    if (itemIndex === -1 || !carrinho.itens[itemIndex]) return res.status(404).json({ message: "Produto não está no carrinho" });

    carrinho.itens[itemIndex].quantidade = quantidade;

    // recalcular total
    carrinho.total = carrinho.itens.reduce(
      (acc, item) => acc + item.precoUnitario * item.quantidade,
      0
    );

    await db.collection("carrinhos").updateOne({ usuarioId }, { $set: carrinho });
    res.json(carrinho);
  }

  // DELETE -> Excluir carrinho do usuário
  async deletarCarrinho(req: Request, res: Response) {
    const { usuarioId } = req.params;

    const resultado = await db.collection("carrinhos").deleteOne({ usuarioId });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: "Carrinho não encontrado" });
    }

    res.json({ message: "Carrinho deletado com sucesso" });
  }
}

export default new CarrinhoController();
