import { Router } from "express";

import { CreateUserController } from "../controllers/CreateUserController";

const userRoutes = Router();

userRoutes.post("/users", new CreateUserController().handle);

export { userRoutes };