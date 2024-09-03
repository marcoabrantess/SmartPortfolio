import { AppDataSource } from '../data-source';
import { Asset } from '../models/Asset';

export class GetAssetService {
    async findBySymbol(symbol: string): Promise<Asset | null> {
        const assetRepository = AppDataSource.getRepository(Asset);
        return await assetRepository.findOne({ where: { code: symbol } });
    }

    async getAllAssets(): Promise<Asset [] | null> {
        const assetRepository = AppDataSource.getRepository(Asset);
        return await assetRepository.find();
    }
}