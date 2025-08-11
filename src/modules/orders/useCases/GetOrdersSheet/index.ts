import { PrismaClient } from "@prisma/client";
import OrderRepository from "../../repositories/ordersRepository";
import GetOrdersSheetController from "./GetOrdersSheetController";
import GetOrdersSheetUseCase from "./GetOrdersSheetUseCase";

export async function GetOrdersSheet() {
  const prisma = new PrismaClient();
  const ordersRepository = new OrderRepository(prisma);
  const getOrdersSheetUseCase = new GetOrdersSheetUseCase(ordersRepository);
  const getOrdersSheetController = new GetOrdersSheetController(
    getOrdersSheetUseCase,
  );

  return { getOrdersSheetController, getOrdersSheetUseCase };
}
