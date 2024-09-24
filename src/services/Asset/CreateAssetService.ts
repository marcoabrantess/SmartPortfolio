import { AppDataSource } from '../../database/data-source';
import { Asset } from '../../models/Asset';
import { User } from '../../models/User';

type AssetRequest = {
    name: string,
    price: number,
    symbol: string
}

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
            relations: ['portfolio']
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        
        const assetInRepository = await assetRepository.find({where: { code: asset.symbol }});


        const portfolio = user.portfolio;

        if (!portfolio) {
            throw new Error('Portfólio não encontrado');
        }

        // Verificar se a ação já está no portfólio
        let assetInPortfolio = assetInRepository? assetInRepository.find(asset => asset.portfolio_id === portfolio.id) : null;

        if (assetInPortfolio) {
            // Calcule o novo preço médio
            const totalCurrentValue = assetInPortfolio.currentValue * assetInPortfolio.quantity;
            const totalNewValue = asset.price * quantity;
            const newQuantity = assetInPortfolio.quantity + quantity;
            
            const newAveragePrice = (totalCurrentValue + totalNewValue) / newQuantity;

            // Atualize o preço médio e a quantidade
            assetInPortfolio.currentValue = newAveragePrice;
            assetInPortfolio.quantity = newQuantity;
        } else {
            // Adicionar nova ação ao portfólio
            assetInPortfolio = new Asset();
            assetInPortfolio.code = asset.symbol;
            assetInPortfolio.currentValue = asset.price;
            assetInPortfolio.name = asset.name;
            assetInPortfolio.yield = 0;
            assetInPortfolio.quantity = quantity;
            assetInPortfolio.portfolio = portfolio;            
        }

        await userRepository.save(user)

        await assetRepository.save(assetInPortfolio)
    }
}
