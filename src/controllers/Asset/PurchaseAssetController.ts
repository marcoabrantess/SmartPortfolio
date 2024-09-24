import { Request, Response } from 'express';
import { CreateAssetService } from '../../services/Asset/CreateAssetService';
import { AppDataSource } from '../../database/data-source';
import { User } from '../../models/User';

export class PurchaseAssetController {
    async handle(req: Request, res: Response) {
        try {
            const { asset, quantity, userId } = req.body;

            const userRepository = AppDataSource.getRepository(User);

            const user = await userRepository.findOne({
                where: { id: userId },
                relations: ['portfolio']
            });
    
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            if(user.available_balance >= (asset.price * quantity)) {
                user.available_balance = user.available_balance - (asset.price * quantity);
            } else {
                return res.status(400).json({ error: 'Saldo insuficiente' });
            }

            await userRepository.save(user)

            const createAssetService = new CreateAssetService();
            await createAssetService.execute({ asset, quantity, userId });

            res.status(200).json({ success: true });
        } catch(error) {
            console.error('Erro ao comprar ação:', error);

            if (error instanceof Error) {
                // Se error for uma instância de Error, envie a mensagem de erro
                res.status(500).json({ error: error.message || 'Erro interno do servidor' });
            } else {
                // Se error não for uma instância de Error, envie uma mensagem genérica
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }
}
