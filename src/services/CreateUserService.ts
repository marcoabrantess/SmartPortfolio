import { AppDataSource } from "../data-source";
import { User } from "../models/User";

type UserRequest = {
    name: string,
    CPF: string,
    login: string,
    password: string
};

export class CreateUserService {
    private categoryRepository = AppDataSource.getRepository(User);

    async execute({ name, CPF, login, password }: UserRequest): Promise<User | Error> {
        if(!name || !CPF || !login || !password) {
            return new Error("Name, CPF, login and password are required");
        }

        const existingUser = await this.categoryRepository.findOne({ where: { CPF } });
        if(existingUser) {
            return new Error("User already exists");
        }

        // Cria uma nova categoria
        const user = this.categoryRepository.create({
            name,
            CPF,
            login,
            password
        });

        // Salva a categoria no banco de dados
        await this.categoryRepository.save(user);

        return user;
    }
}