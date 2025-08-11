import { Router } from "express";
import { GetOrdersSheet } from "../modules/orders/useCases/GetOrdersSheet";

const ordersRouter = Router();

ordersRouter.get("/sheet/:id", async (request, response) => {
  const { getOrdersSheetController } = await GetOrdersSheet();
  return getOrdersSheetController.handle(request, response);
});

export default ordersRouter;
