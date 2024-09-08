import { Request, Response } from 'express';
import { AppDataSource } from '../../database/data-source';
import { User } from '../../models/User';
import { GetAssetPricesService } from '../../services/Asset/GetAssetPricesService'; // Ajuste o caminho conforme necessário

export class GetUserTotalInvestedController {
    async handle (req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const userRepository = AppDataSource.getRepository(User);

            // Carregar o usuário com a relação do portfólio
            const user = await userRepository.findOne({
                where: { id: userId },
                relations: ['portfolio', 'portfolio.assets'] // Certifique-se de carregar as relações necessárias
            });

            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            const getAssetPricesService = new GetAssetPricesService([]);
            // Calcular o total investido
            const totalInvested = await user.portfolio?.assets.reduce(async (totalPromise, asset) => {
                const total = await totalPromise;
                const price = await getAssetPricesService.getAssetPriceBySymbol(asset.code);

                if (price !== null) {
                    return total + price * asset.quantity;
                } else {
                    return total; // Se o preço não estiver disponível, não adiciona nada
                }
            }, Promise.resolve(0)) || 0;

            return res.status(200).json({success: true, totalInvested: totalInvested})
        } catch (error) {
            console.error('Erro ao obter valor total investido:', error);
            return res.status(500).json({success: false, error: error})
        }
    }
};
