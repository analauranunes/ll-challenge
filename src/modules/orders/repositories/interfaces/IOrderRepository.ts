import { Decimal } from "@prisma/client/runtime/library";
import { TGetOrderSheetDTO, TOrdersFilter } from "../../../../types";

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

  getAllOrders({
    filterBy,
    orderId,
    start,
    end,
  }: {
    filterBy: TOrdersFilter;
    orderId?: string;
    start?: string;
    end?: string;
  }): Promise<TGetOrderSheetDTO[]>;
}
