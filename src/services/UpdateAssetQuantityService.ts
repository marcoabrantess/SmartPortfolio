import { AppDataSource } from '../data-source';
import { Asset } from '../models/Asset';

export class GetAssetBySymbolService {
    async updateQuantity(asset: Asset, quantity: number): Promise<void> {
        const assetRepository = AppDataSource.getRepository(Asset);
        asset.quantity += quantity; // Supondo que você tenha uma propriedade `quantity` em Asset
        await assetRepository.save(asset);
    }
}
