import { Router } from "express";
import ordersRouter from "./ordersRouter";

const router = Router();

router.use("/orders", ordersRouter);

export default router;
