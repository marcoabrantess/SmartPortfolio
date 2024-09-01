import { Router } from 'express';
import cors from 'cors';
import { AssetPricerController } from '../controllers/AssetPricerController'

const stockPriceRoutes = Router();

stockPriceRoutes.use(cors());

// Use o controlador na rota
stockPriceRoutes.get('/assets-price', new AssetPricerController().handle);

export { stockPriceRoutes };
