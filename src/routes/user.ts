import { Router } from "express";

import { CreateUserController } from "../controllers/User/CreateUserController";
import { GetUserTotalInvestedController } from "../controllers/Portfolio/GetTotalInvestedController";
import { GetUserAmountController } from "../controllers/User/GetUserAmountController";

const userRoutes = Router();

userRoutes.post("/users", new CreateUserController().handle);
userRoutes.get(`/obter-total-investido/:userId`, new GetUserTotalInvestedController().handle);
userRoutes.get(`/obter-total-depositado/:userId`, new GetUserAmountController().handle);

export { userRoutes };