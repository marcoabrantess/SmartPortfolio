import express from 'express';
import cors from 'cors';

import { stockPriceRoutes } from '../routes/assets';
import { userRoutes } from '../routes/user';
import { authRoutes } from '../routes/auth';
import { depositRoutes } from '../routes/deposit';

import { AppDataSource } from '../data-source';

// Conectar ao banco de dados
AppDataSource.initialize().then(() => {
    console.log('Database connected');
}).catch(error => console.log('Database connection error:', error));

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use(stockPriceRoutes);
app.use(userRoutes)
app.use(authRoutes)
app.use(depositRoutes)

export { app };
