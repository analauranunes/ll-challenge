import { PrismaClient } from "@prisma/client";
import { TGetOrderSheetDTO, TOrdersFilter } from "../../../types";
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

  getAllOrders({
    filterBy = "ALL",
    orderId,
    start,
    end,
  }: {
    filterBy?: TOrdersFilter;
    orderId?: string;
    start?: string;
    end?: string;
  }) {
    if (filterBy === "ORDER_ID") {
      return this.prisma.order.findMany({
        where: {
          orderId: Number(orderId),
        },
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

    if (filterBy === "PERIOD" && end && start) {
      return this.prisma.order.findMany({
        where: {
          purchaseDate: {
            lte: new Date(end),
            gte: new Date(start),
          },
        },
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
}
