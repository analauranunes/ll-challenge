import { Decimal } from "@prisma/client/runtime/library";
import { TGetOrderSheetDTO } from "../../useCases/GetOrdersSheet/types";

export type TFormattedOrder = {
  userId: number;
  name: string;
  orders: {
    orderId: number;
    total: Decimal;
    purchaseDate: Date;
    products: {
      productId: number;
      value: Decimal;
    }[];
  }[];
}[];

export interface IOrderRepository {
  create({
    userId,
    clientName,
    orderId,
    productId,
    productValue,
    purchaseDate,
  }: TGetOrderSheetDTO): Promise<TGetOrderSheetDTO>;

  getAllOrders(): Promise<TGetOrderSheetDTO[]>;
}
