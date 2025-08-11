import { TFormattedOrder } from "../modules/orders/repositories/interfaces/IOrderRepository";
import { TGetOrderSheetDTO } from "../modules/orders/useCases/GetOrdersSheet/types";

export function formatOrdersList(orders: TGetOrderSheetDTO[]) {
  const formattedOrders: TFormattedOrder = [];

  for (const order of orders) {
    if (
      !formattedOrders.find(
        (formattedOrder) => formattedOrder.userId === order.userId,
      )
    ) {
      formattedOrders.push({
        name: order.clientName,
        userId: order.userId,
        orders: [
          {
            orderId: order.orderId,
            purchaseDate: order.purchaseDate,
            total: order.productValue,
            products: [
              {
                productId: order.productId,
                value: order.productValue,
              },
            ],
          },
        ],
      });
    }

    for (const formattedOrder of formattedOrders) {
      if (formattedOrder.userId === order.userId) {
        const isNewProduct = formattedOrder.orders.find((orderMap) =>
          orderMap.products.find(
            (products) => products.productId !== order.productId,
          ),
        );

        if (isNewProduct) {
          isNewProduct.total = isNewProduct.total.plus(order.productValue);
          isNewProduct.products.push({
            productId: order.productId,
            value: order.productValue,
          });
        }
      }
    }
  }

  return formattedOrders;
}
