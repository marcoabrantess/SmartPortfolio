import { Request, Response } from 'express';
import { CreateAssetService } from '../services/CreateAssetService';
import { GetAssetService } from '../services/GetAssetService';

export class AcoesController {
    async handle(req: Request, res: Response) {
        try {
            const { userId, symbol, quantity, price } = req.body;

            const createAssetService = new CreateAssetService();
            // createAssetService.execute()


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
