import { AppDataSource } from '../data-source';
import { Asset } from '../models/Asset';
import { User } from '../models/User';

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
            // Atualize a quantidade da ação existente
            assetInPortfolio.currentValue = asset.price;
            assetInPortfolio.quantity += quantity;

            if(user.available_balance >= (asset.price * quantity)) {
                user.available_balance = user.available_balance - (asset.price * quantity)
            } else {
                throw "saldo insuficiente"
            }
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
