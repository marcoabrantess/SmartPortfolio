import { Router } from "express";

import { CreateUserController } from "../controllers/CreateUserController";
import { GetUserTotalInvestedController } from "../controllers/GetTotalInvestedController";
import { GetUserAmountController } from "../controllers/GetUserAmountController";

const userRoutes = Router();

userRoutes.post("/users", new CreateUserController().handle);
userRoutes.get(`/obter-total-investido/:userId`, new GetUserTotalInvestedController().handle);
userRoutes.get(`/obter-total-depositado/:userId`, new GetUserAmountController().handle);

export { userRoutes };