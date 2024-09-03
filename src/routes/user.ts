import { Router } from "express";

import { CreateUserController } from "../controllers/CreateUserController";
import { GetUserTotalInvestedController } from "../controllers/GetTotalInvestedController";

const userRoutes = Router();

userRoutes.post("/users", new CreateUserController().handle);
userRoutes.post("/obter-total-investido", new GetUserTotalInvestedController().handle);

export { userRoutes };