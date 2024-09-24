import { Request, Response } from 'express';
import { ManageBalanceService } from '../../services/User/ManageBalanceService';

export class DepositBalanceController {
    async handle(req: Request, res: Response) {

        try {
            const { depositAmount, userId } = req.body;
            
            const balanceService = new ManageBalanceService();
            balanceService.addBalance(depositAmount, userId);

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Erro ao depositar:', error);
            return res.status(500).json({ error: 'Erro ao depositar' });
        }
    }
}
