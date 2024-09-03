import { Request, Response } from 'express';
import { CreateAssetService } from '../services/CreateAssetService';

export class PurchaseAssetController {
    async handle(req: Request, res: Response) {
        try {
            const { asset, quantity, userId } = req.body;

            const createAssetService = new CreateAssetService();
            createAssetService.execute({asset, quantity, userId})

            res.status(200).json({ success: true });
        } catch(error) {
            console.error('Erro ao comprar ações:', error);
            res.status(500).json({ error: 'Erro ao comprar ações' });
        }
    }
}
