import { AppDataSource } from '../../database/data-source';
import { Portfolio } from '../../models/Portfolio';


export class CreatePortfolioService {
    public async execute(): Promise<Portfolio> {
        const portfoliosRepository = AppDataSource.getRepository(Portfolio);

        // Cria um novo portfólio para o usuário
        const portfolio = portfoliosRepository.create();

        await portfoliosRepository.save(portfolio);

        return portfolio;
    }
}