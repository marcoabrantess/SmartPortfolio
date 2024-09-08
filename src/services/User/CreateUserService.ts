import { AppDataSource } from "../../database/data-source";
import { User } from "../../models/User";
import { CreatePortfolioService } from "./CreatePortfolioService";
import bcrypt from 'bcrypt'; // Importa o bcrypt

type UserRequest = {
    name: string,
    CPF: string,
    login: string,
    password: string
};

export class CreateUserService {
    private userRepository = AppDataSource.getRepository(User);
    private createPortfolioService = new CreatePortfolioService();

    public async execute({ name, CPF, login, password }: UserRequest): Promise<User | Error> {
        if (!name || !CPF || !login || !password) {
            return new Error("Name, CPF, login, and password are required");
        }

        // Verifica se o usuário já existe
        const existingUser = await this.userRepository.findOne({
            where: { CPF },
            relations: ["portfolio"] // Inclui o relacionamento com o portfólio
        });
        if (existingUser) {
            return new Error("CPF ja cadastrado");
        }
        
        // Agora que o ID do usuário existe, crie o portfólio associado
        const portfolio = await this.createPortfolioService.execute();

        if (!portfolio) {
            return new Error("Failed to create portfolio");
        }

        // Criptografa a senha
        const saltRounds = 10; // Número de rounds para o bcrypt gerar o salt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Cria um novo usuário e associa o portfólio
        const user = this.userRepository.create({
            name,
            CPF,
            login,
            password: hashedPassword, // Salva a senha criptografada
            portfolio_id: portfolio.id
        });

        // Salva o usuário para obter o ID
        await this.userRepository.save(user);

        return user;
    }
}
