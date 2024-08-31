import express from 'express';
import cors from 'cors';
import { stockPriceRoutes } from '../routes/stock-price';
import { userRoutes } from '../routes/user';

import { AppDataSource } from '../data-source';

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
        // Aqui você pode instanciar e usar os serviços
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });


const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use(stockPriceRoutes);
app.use(userRoutes)

export { app };
