import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
    static async register(req: Request, res: Response): Promise<Response> {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).send('Login and password are required');
        }

        try {
            await AuthService.register(login, password);
            return res.status(201).send('User registered');
        } catch (error: unknown) {
            // Verifica se o erro é uma instância de Error
            if (error instanceof Error) {
                return res.status(500).send(error.message);
            }
            return res.status(500).send('An unexpected error occurred');
        }
    }

    static async login(req: Request, res: Response): Promise<Response> {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).send('Login and password are required');
        }

        try {
            const { token, name } = await AuthService.login(login, password);
            return res.status(200).json({ token, name });
        } catch (error: unknown) {
            // Verifica se o erro é uma instância de Error
            if (error instanceof Error) {
                return res.status(401).send(error.message);
            }
            return res.status(500).send('An unexpected error occurred');
        }
    }
}
