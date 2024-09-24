import { AppDataSource } from '../../database/data-source';
import { Portfolio } from '../../models/Portfolio';
import { PortfolioFactory } from '../../Factory/PortfolioFactory';

export class CreatePortfolioService {
  public async execute(): Promise<Portfolio> {
    const portfoliosRepository = AppDataSource.getRepository(Portfolio);

    const portfolio = PortfolioFactory.create();

    await portfoliosRepository.save(portfolio);

    return portfolio;
  }
}
