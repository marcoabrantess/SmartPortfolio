import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Certifique-se de usar bcryptjs
import { User } from '../models/User';
import { AppDataSource } from '../data-source';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const userRepository = AppDataSource.getRepository(User);

interface UserInformations {
    userId: string;
    name: string;
}

interface LoginResponse {
    token: string;
    user: UserInformations;
}

export class AuthService {
    static async register(login: string, password: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.login = login;
        user.password = hashedPassword;

        await userRepository.save(user);
    }

    static async login(login: string, password: string): Promise<LoginResponse> {
        const user = await userRepository.findOne({ where: { login } });
        if (!user) throw new Error('Usuário não existente');

        // Verifica se a senha fornecida corresponde à senha criptografada armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Senha inválida');

        const token = jwt.sign({ login: user.login }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        const userInformation: UserInformations = {
            userId: user.id,
            name: user.name,
        };

        return { token, user: userInformation };
    }
}
