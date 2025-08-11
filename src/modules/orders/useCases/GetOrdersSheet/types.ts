import { Decimal } from "@prisma/client/runtime/library";

export type TGetOrderSheetDTO = {
  userId: number;
  clientName: string;
  orderId: number;
  productId: number;
  productValue: Decimal;
  purchaseDate: Date;
};
