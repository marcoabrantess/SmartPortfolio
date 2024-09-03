import { Router } from 'express';
import cors from 'cors';
import { AssetPricerController } from '../controllers/AssetPricerController'
import { PurchaseAssetController } from '../controllers/PurchaseAssetController';

const stockPriceRoutes = Router();

stockPriceRoutes.use(cors());

// Use o controlador na rota
stockPriceRoutes.get('/assets-price', new AssetPricerController().handle);
stockPriceRoutes.post('/comprar-acao', new PurchaseAssetController().handle);

export { stockPriceRoutes };
