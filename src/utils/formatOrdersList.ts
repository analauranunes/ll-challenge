import { Decimal } from "@prisma/client/runtime/library";
import { TFormattedOrder } from "../modules/orders/repositories/interfaces/IOrderRepository";
import { TGetOrderSheetDTO } from "../types";

export function formatOrdersList(orders: TGetOrderSheetDTO[]) {
  const formattedOrders: TFormattedOrder = [];

  for (const order of orders) {
    let userOrderExists = formattedOrders.find(
      (formattedOrder) => formattedOrder.userId === order.userId,
    );

    if (!userOrderExists) {
      userOrderExists = {
        name: order.clientName,
        userId: order.userId,
        orders: [],
      };
      formattedOrders.push(userOrderExists);
    }

    let existentOrder = userOrderExists.orders.find(
      (orderFind) => orderFind.orderId === order.orderId,
    );
    if (!existentOrder) {
      existentOrder = {
        orderId: order.orderId,
        purchaseDate: order.purchaseDate,
        total: new Decimal(0),
        products: [],
      };
      userOrderExists.orders.push(existentOrder);
    }

    const existentProduct = existentOrder.products.find(
      (product) => product.productId === order.productId,
    );

    if (!existentProduct) {
      existentOrder.products.push({
        productId: order.productId,
        value: order.productValue,
      });

      existentOrder.total = existentOrder.total.plus(order.productValue);
    }
  }

  return formattedOrders;
}
