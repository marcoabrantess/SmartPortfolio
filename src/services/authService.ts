import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { AppDataSource } from '../data-source';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const userRepository = AppDataSource.getRepository(User);

interface userInformations {
    userId: string,
    name: string,
    available_balance: number
}

interface login {
    token: string,
    user: userInformations
}

export class AuthService {
    static async register(login: string, password: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.login = login;
        user.password = hashedPassword;

        await userRepository.save(user);
    }

    static async login(login: string, password: string): Promise<login> {
        const user = await userRepository.findOne({ where: { login } });
        if (!user) throw new Error('Usuario nao existente');

        //const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password === user.password;
        if (!isMatch) throw new Error('Senha invalida');

        const token = jwt.sign({ login: user.login }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const userInformation: userInformations = {
            userId: user.id,
            name: user.name,
            available_balance: user.available_balance // Certifique-se de que a coluna está corretamente nomeada e acessível
        };

        return { token, user: userInformation };
    }
}
