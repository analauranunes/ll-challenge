import { PrismaClient } from "@prisma/client";
import { TGetOrderSheetDTO } from "../useCases/GetOrdersSheet/types";
import { IOrderRepository } from "./interfaces/IOrderRepository";

export default class OrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create({
    userId,
    clientName,
    orderId,
    productId,
    productValue,
    purchaseDate,
  }: TGetOrderSheetDTO) {
    return this.prisma.order.create({
      data: {
        userId,
        clientName,
        orderId,
        productId,
        productValue,
        purchaseDate,
      },
    });
  }
}
