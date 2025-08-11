import { PrismaClient } from "@prisma/client";
import OrderRepository from "../../repositories/OrdersRepository";
import GetAllOrdersController from "./GetAllOrdersController";
import GetAllOrdersUseCase from "./GetAllOrdersUseCase";

export async function GetAllOrders() {
  const prisma = new PrismaClient();

  const ordersRepository = new OrderRepository(prisma);
  const getAllOrdersUseCase = new GetAllOrdersUseCase(ordersRepository);
  const getAllOrdersController = new GetAllOrdersController(
    getAllOrdersUseCase,
  );

  return { getAllOrdersController, getAllOrdersUseCase };
}
