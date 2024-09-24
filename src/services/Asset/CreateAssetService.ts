import { AppDataSource } from '../../database/data-source';
import { Asset } from '../../models/Asset';
import { User } from '../../models/User';
import { AssetFactory } from '../../Factory/AssetFactory';

type AssetRequest = {
  name: string;
  price: number;
  symbol: string;
};

interface CreateAssetParams {
  userId: string;
  asset: AssetRequest;
  quantity: number;
}

export class CreateAssetService {
  async execute({ asset, quantity, userId }: CreateAssetParams): Promise<void> {
    if (!userId || !asset || !quantity) {
      throw new Error('Parâmetros inválidos');
    }

    const userRepository = AppDataSource.getRepository(User);
    const assetRepository = AppDataSource.getRepository(Asset);

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['portfolio'],
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const assetInRepository = await assetRepository.find({
      where: { code: asset.symbol },
    });

    const portfolio = user.portfolio;

    if (!portfolio) {
      throw new Error('Portfólio não encontrado');
    }

    const assetInPortfolio = assetInRepository ? assetInRepository.find((asset) => asset.portfolio_id === portfolio.id) : null;

    const assetToSave = AssetFactory.createOrUpdateAsset(
      user,
      asset,
      quantity,
      assetInPortfolio || undefined
    );

    await userRepository.save(user);
    await assetRepository.save(assetToSave);
  }
}
