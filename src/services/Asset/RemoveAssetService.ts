import { AppDataSource } from '../data-source';
import { Asset } from '../models/Asset';
import { User } from '../models/User';

interface DeleteAssetParams {
    userId: string;
    quantity: number;
    assetId: string;
    price: number
}

export class RemoveAssetService {
    async execute({ userId, quantity, assetId, price }: DeleteAssetParams ): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const assetRepository = AppDataSource.getRepository(Asset);

        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['portfolio']
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Converte available_balance e depositAmount para números antes de somar
        const currentBalance = parseFloat(user.available_balance.toString());
        const assetPrice = parseFloat(price.toString());

        // Atualiza o saldo e arredonda para duas casas decimais
        const newBalance = parseFloat((currentBalance + assetPrice).toFixed(2));

        user.available_balance = newBalance;

        userRepository.save(user);
        
        const assetInRepository = await assetRepository.findOne({where: { id: assetId }});

        if(!assetInRepository) {
            throw "Ação nao encontrada no portfolio"
        } else {
            if(quantity > assetInRepository.quantity) {
                throw "So pode vender a quantidade certa de ações"
            } else if(quantity === assetInRepository.quantity) {
                assetRepository.remove(assetInRepository);
            } else {
                assetInRepository.quantity -= quantity;
                assetRepository.save(assetInRepository)
            }
        }

    }
}