import { PrismaClient } from "@prisma/client";
import { TGetOrderSheetDTO } from "../../../types";
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

  getAllOrders() {
    return this.prisma.order.findMany({
      select: {
        clientName: true,
        orderId: true,
        productId: true,
        productValue: true,
        purchaseDate: true,
        userId: true,
      },
    });
  }

  getFilteredOrders() {}
}
