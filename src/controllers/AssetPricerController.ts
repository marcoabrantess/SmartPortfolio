import { Request, Response } from 'express';
import { GetAssetPricesService } from '../services/GetAssetPricesService';

const SYMBOLS = ['IBM', 'AAPL', 'GOOGL', 'MSFT']; // Exemplo de símbolos válidos

export class AssetPricerController {
    async handle(req: Request, res: Response) {
        const getAssetPricesService = new GetAssetPricesService(SYMBOLS);

        try {
            // Verifica se foi fornecido um símbolo específico
            const { symbol } = req.query;

            if (symbol) {
                const acao = await getAssetPricesService.getAssetPriceBySymbol(symbol as string);

                if (acao) {
                    return res.status(200).json({ success: true, acao });
                } else {
                    return res.status(404).json({ success: false, message: 'Ação não encontrada.' });
                }
            } else {
                // Se nenhum símbolo foi fornecido, busca todos os preços
                const acoes = await getAssetPricesService.getAllAssetPrices();
                return res.status(200).json({ success: true, acoes });
            }
        } catch (error) {
            console.error('Erro ao buscar preços das ações:', error);
            return res.status(500).json({ error: 'Erro ao buscar preços das ações' });
        }
    }
}
