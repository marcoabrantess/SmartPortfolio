import { Request, Response } from 'express';
import { AppDataSource } from '../../database/data-source';
import { User } from '../../models/User';

export class GetUserAmountController {
    async handle (req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const userRepository = AppDataSource.getRepository(User);

            // Carregar o usuário com a relação do portfólio
            const user = await userRepository.findOne({
                where: { id: userId },
                relations: ['portfolio', 'portfolio.assets'] // Certifique-se de carregar as relações necessárias
            });

            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            
            const amount = Number(user.available_balance);

            return res.status(200).json({success: true, amount: amount})
        } catch (error) {
            console.error('Erro ao obter valor total investido:', error);
            return res.status(500).json({success: false, error: error})
        }
    }
};
