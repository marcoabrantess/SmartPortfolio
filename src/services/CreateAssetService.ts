import { AppDataSource } from '../data-source';
import { Asset } from '../models/Asset';
import { Portfolio } from '../models/Portfolio';
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
        const portfolioRepository = AppDataSource.getRepository(Portfolio);

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

        assetRepository.save(assetInPortfolio)

        // Salvar o portfólio atualizado
        await portfolioRepository.save(portfolio);
    }
}
