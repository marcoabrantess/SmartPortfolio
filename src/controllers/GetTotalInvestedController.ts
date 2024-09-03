import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';

export const getUserTotalInvested = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['portfolio']
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const totalInvested = await user.getTotalInvestedValue();
        console.log(`Valor total investido pelo usuário ${userId}: R$${totalInvested}`);
        
        res.json({ totalInvested });
    } catch (error) {
        console.error('Erro ao obter valor total investido:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
