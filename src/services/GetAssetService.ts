import { User } from '../models/User';
import { AppDataSource } from '../data-source';
import { Asset } from '../models/Asset';

export class GetAssetService {
    async findBySymbol(symbol: string): Promise<Asset | null> {
        const assetRepository = AppDataSource.getRepository(Asset);
        return await assetRepository.findOne({ where: { code: symbol } });
    }

    async getAllAssets(userId: string): Promise<Asset [] | null> {
        const assetRepository = AppDataSource.getRepository(Asset);
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { name: userId },
            relations: ['portfolio']
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const portfolio = user.portfolio;

        return await assetRepository.find({ where: { portfolio_id: portfolio.id } });
    }
}