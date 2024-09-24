import { Request, Response } from 'express';
import { GetAssetPricesService } from '../../services/Asset/GetAssetPricesService';

const SYMBOLS = [
    'AAPL', // Apple Inc.
    'ADBE', // Adobe Inc.
    'AMZN', // Amazon.com, Inc.
    'BAC',  // Bank of America Corporation
    'CSCO', // Cisco Systems, Inc.
    'CVX',  // Chevron Corporation
    'DIS',  // The Walt Disney Company
    'GOOGL',// Alphabet Inc. (Google)
    'HD',   // The Home Depot, Inc.
    'IBM',  // International Business Machines Corporation
    'INTC', // Intel Corporation
    'JPM',  // JPMorgan Chase & Co.
    'KO',   // The Coca-Cola Company
    'MA',   // Mastercard Incorporated
    'META', // Meta Platforms, Inc. (antigo Facebook)
    'MRK',  // Merck & Co., Inc.
    'MSFT', // Microsoft Corporation
    'NFLX', // Netflix, Inc.
    'NKE',  // NIKE, Inc.
    'NVDA', // NVIDIA Corporation
    'ORCL', // Oracle Corporation
    'PEP',  // PepsiCo, Inc.
    'PFE',  // Pfizer Inc.
    'PG',   // The Procter & Gamble Company
    'PYPL', // PayPal Holdings, Inc.
    'TSLA', // Tesla, Inc.
    'UNH',  // UnitedHealth Group Incorporated
    'V',    // Visa Inc.
    'WMT',  // Walmart Inc.
    'XOM',  // Exxon Mobil Corporation
];

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
