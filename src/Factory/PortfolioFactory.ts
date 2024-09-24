import { Portfolio } from '../models/Portfolio';

export abstract class PortfolioFactory {
  static create(): Portfolio {
    const portfolio = new Portfolio();

    return portfolio;
  }
}
