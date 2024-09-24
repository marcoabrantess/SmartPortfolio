import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { CreatePortfolioService } from '../services/Portfolio/CreatePortfolioService';

type UserRequest = {
  name: string;
  CPF: string;
  login: string;
  password: string;
};

export abstract class UserFactory {
  private static createPortfolioService = new CreatePortfolioService();

  public static async create({ name, CPF, login, password }: UserRequest): Promise<User> {
    const portfolio = await this.createPortfolioService.execute();
    if (!portfolio) {
      throw new Error('Failed to create portfolio');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User();
    user.name = name;
    user.CPF = CPF;
    user.login = login;
    user.password = hashedPassword;
    user.portfolio = portfolio;

    return user;
  }
}
