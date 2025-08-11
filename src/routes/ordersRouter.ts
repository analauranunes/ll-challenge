import { Router } from "express";
import { GetAllOrders } from "../modules/orders/useCases/GetAllOrders";
import { GetOrdersSheet } from "../modules/orders/useCases/GetOrdersSheet";

const ordersRouter = Router();

ordersRouter.get("/", async (request, response) => {
  const { getAllOrdersController } = await GetAllOrders();
  return getAllOrdersController.handle(request, response);
});

ordersRouter.get("/sheet", async (request, response) => {
  const { getOrdersSheetController } = await GetOrdersSheet();
  return getOrdersSheetController.handle(request, response);
});

export default ordersRouter;
