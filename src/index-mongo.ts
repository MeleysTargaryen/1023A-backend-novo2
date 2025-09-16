
import 'dotenv/config'
import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI!);
await client.connect();
const db = client.db(process.env.MONGO_DB);
const app = express()
app.use(express.json());


app.get('/estudantes', async (req: Request, res: Response) => {
    const estudantes = await db.collection('estudantes').find().toArray();
    res.status(200).json(estudantes);
});
app.post('/estudantes', async (req: Request, res: Response) => {
    const Estudante = req.body;
    const resultado = await db.collection('estudantes').insertOne(Estudante);
    res.status(201).json({ ...Estudante, _id: resultado.insertedId });
});

app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});
