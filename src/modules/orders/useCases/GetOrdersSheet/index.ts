import { PrismaClient } from "@prisma/client";
import OrderRepository from "../../repositories/OrdersRepository";
import GetAllOrdersUseCase from "../GetAllOrders/GetAllOrdersUseCase";
import GetOrdersSheetController from "./GetOrdersSheetController";
import GetOrdersSheetUseCase from "./GetOrdersSheetUseCase";

export async function GetOrdersSheet() {
  const prisma = new PrismaClient();
  const ordersRepository = new OrderRepository(prisma);
  const getOrdersSheetUseCase = new GetOrdersSheetUseCase(ordersRepository);
  const getAllOrdersUseCase = new GetAllOrdersUseCase(ordersRepository);
  const getOrdersSheetController = new GetOrdersSheetController(
    getOrdersSheetUseCase,
  );

  return { getOrdersSheetController, getOrdersSheetUseCase };
}
