import { Request, Response } from 'express';
import { RemoveAssetService } from '../services/RemoveAssetService';

export class SellAssetController {
    async handle(req: Request, res: Response) {
        try {
            const { userId, quantity, assetId, price } = req.body;

            const removeAssetService = new RemoveAssetService();
            removeAssetService.execute({ userId, quantity, assetId, price })

            res.status(200).json({ success: true });
        } catch(error) {
            console.error('Erro ao vender ações:', error);
            res.status(500).json({ error: 'Erro ao vender ações' });
        }
    }
}