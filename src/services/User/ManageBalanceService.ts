import { AppDataSource } from '../../database/data-source';
import { User } from '../../models/User';

export class ManageBalanceService {
    async addBalance(depositAmount: number, userId: string): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ['portfolio']
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }


        // Converte available_balance e depositAmount para números antes de somar
        const currentBalance = parseFloat(user.available_balance.toString());
        const deposit = parseFloat(depositAmount.toString());

        // Atualiza o saldo e arredonda para duas casas decimais
        const newBalance = parseFloat((currentBalance + deposit).toFixed(2));

        user.available_balance = newBalance;

        
        await userRepository.save(user);
    }

    async removeBalance(value: number, userId: string): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { name: userId },
            relations: ['portfolio']
        });

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Converte available_balance para número antes de subtrair
        const currentBalance = parseFloat(user.available_balance.toString());
        const newBalance = parseFloat((currentBalance - value).toFixed(2));

        user.available_balance = newBalance;
        
        await userRepository.save(user);

    }
}