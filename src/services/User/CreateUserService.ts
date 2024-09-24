import { AppDataSource } from '../../database/data-source';
import { User } from '../../models/User';
import { UserFactory } from '../../Factory/UserFactory'; // Importe a fábrica criada

type UserRequest = {
  name: string;
  CPF: string;
  login: string;
  password: string;
};

export class CreateUserService {
  private userRepository = AppDataSource.getRepository(User);

  public async execute({ name, CPF, login, password }: UserRequest): Promise<User | Error> {
    if (!name || !CPF || !login || !password) {
      return new Error('Name, CPF, login, and password are required');
    }

    // Verifica se o usuário já existe
    const existingUser = await this.userRepository.findOne({
      where: { CPF },
      relations: ['portfolio'],
    });
    if (existingUser) {
      return new Error('CPF já cadastrado');
    }

    try {
      const user = await UserFactory.create({ name, CPF, login, password });

      await this.userRepository.save(user);

      return user;
    } catch (error) {
        if (error instanceof Error) {
          return new Error('Erro ao criar o usuário: ' + error.message);
        }
        
        return new Error('Erro desconhecido ao criar o usuário');
      }
  }
}
