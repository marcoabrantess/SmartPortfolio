import { Router } from "express";

import { DepositBalanceController } from "../controllers/DepositBalanceController";

const depositRoutes = Router();

depositRoutes.post("/depositar", new DepositBalanceController().handle);

export { depositRoutes };