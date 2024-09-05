import { Router } from 'express';
import cors from 'cors';
import { AssetPricerController } from '../controllers/AssetPricerController'
import { PurchaseAssetController } from '../controllers/PurchaseAssetController';
import { SellAssetController } from '../controllers/SellAssetController';
import { GetAssetController } from '../controllers/GetAssetController';

const stockPriceRoutes = Router();

stockPriceRoutes.use(cors());

// Use o controlador na rota
stockPriceRoutes.get('/assets-price', new AssetPricerController().handle);
stockPriceRoutes.get('/minhas-acoes/:userId', new GetAssetController().handle);
stockPriceRoutes.post('/comprar-acao', new PurchaseAssetController().handle);
stockPriceRoutes.post('/vender-acao', new SellAssetController().handle);

export { stockPriceRoutes };
