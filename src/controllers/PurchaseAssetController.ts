import { Request, Response } from 'express';
import { CreateAssetService } from '../services/CreateAssetService';
import { GetAssetBySymbolService } from '../services/GetAssetBySymbolService';

export class AcoesController {
    async handle(req: Request, res: Response) {
        try {
            const { symbol, quantity, price, currentValue, yeld } = req.body;

            const existingAsset = new GetAssetBySymbolService(symbol);
            if(existingAsset) {
                UpdateAsset
            }
        } catch(error) {
            console.error('Erro ao comprar ações:', error);
            res.status(500).json({ error: 'Erro ao comprar ações' });
        }
    }
    // static async comprarAcao(req: Request, res: Response) {
    //     const { userId, assetId, quantity } = req.body;

    //     try {
    //         await CreateAssetService.execute({ userId, assetId, quantity });
    //         res.status(200).json({ message: 'Ação comprada com sucesso' });
    //     } catch (error) {
    //         console.error('Erro ao comprar ação:', error.message);
    //         res.status(500).json({ error: error.message });
    //     }
    // }
}
