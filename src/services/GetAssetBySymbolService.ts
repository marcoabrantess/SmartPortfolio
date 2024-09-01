import { AppDataSource } from '../data-source';
import { Asset } from '../models/Asset';

export class GetAssetBySymbolService {
    static async findBySymbol(symbol: string): Promise<Asset | null> {
        const assetRepository = AppDataSource.getRepository(Asset);
        return await assetRepository.findOne({ where: { code: symbol } });
    }
}
