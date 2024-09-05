import { Request, Response } from 'express';
import { GetAssetService } from '../services/GetAssetService';
import { GetAssetPricesService } from '../services/GetAssetPricesService';

export class GetAssetController {
    async handle(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const getAssetPricesService = new GetAssetPricesService([]);

            const getAssetService = new GetAssetService();
            const result = await getAssetService.getAllAssets(userId);
            if(!result) throw ""
            const updatedAssets = await Promise.all(result.map(async (asset) => {
                const price = await getAssetPricesService.getAssetPriceBySymbol(asset.code);
                return { ...asset, price: price }; // Adiciona o preço atual ao objeto de ativo
            }));

            return res.status(200).json({ success: true, assets: updatedAssets });
        } catch(error) {
            console.error('Erro ao obter ações:', error);
            res.status(500).json({ error: 'Erro ao obter ações' });
        }
    }
}