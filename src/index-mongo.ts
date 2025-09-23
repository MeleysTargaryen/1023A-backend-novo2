
import 'dotenv/config'
import express, { Request, Response } from 'express';
import rotas from './rotas.js';

const app = express()
app.use(express.json());
app.use(rotas);



app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});
