import express from 'express';
import cors from 'cors';
import { stockPriceRouter } from '../routes/stock-price';


const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use(stockPriceRouter);

export { app };
