import { Router } from 'express';
import { AuthController } from '../controllers/Auth/authController';

const authRoutes = Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);

export { authRoutes };
