import { AppDataSource } from '../data-source';
import { Asset } from '../models/Asset';
import { Portfolio } from '../models/Portfolio';
import { User } from '../models/User';

interface CreateAssetParams {
    userId: string;
    assetId: string;
    quantity: number;
}

export class CreateAssetService {
    static async execute({ userId, assetId, quantity }: CreateAssetParams): Promise<void> {
        if (!userId || !assetId || !quantity) {
            throw new Error('Parâmetros inválidos');
        }

        const userRepository = AppDataSource.getRepository(User);
        const assetRepository = AppDataSource.getRepository(Asset);
        const portfolioRepository = AppDataSource.getRepository(Portfolio);

        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['portfolio']
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const asset = await assetRepository.findOne({where: { id: assetId }});

        if (!asset) {
            throw new Error('Ação não encontrada');
        }

        const portfolio = user.portfolio;

        if (!portfolio) {
            throw new Error('Portfólio não encontrado');
        }

        // Verificar se a ação já está no portfólio
        let assetInPortfolio = portfolio.assets.find(a => a.id === assetId);

        if (assetInPortfolio) {
            // Atualize a quantidade da ação existente
            assetInPortfolio.currentValue = asset.currentValue;
            assetInPortfolio.quantity += quantity;
        } else {
            // Adicionar nova ação ao portfólio
            assetInPortfolio = new Asset();
            assetInPortfolio.id = asset.id;
            assetInPortfolio.code = asset.code;
            assetInPortfolio.currentValue = asset.currentValue;
            assetInPortfolio.name = asset.name;
            assetInPortfolio.yield = asset.yield;
            assetInPortfolio.quantity = quantity;
            assetInPortfolio.portfolio = portfolio;

            portfolio.assets.push(assetInPortfolio);
        }

        // Salvar o portfólio atualizado
        await portfolioRepository.save(portfolio);
    }
}
