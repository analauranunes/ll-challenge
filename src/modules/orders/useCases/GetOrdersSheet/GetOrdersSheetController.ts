import { Decimal } from "@prisma/client/runtime/library";
import { Request, Response } from "express";
import PublicGoogleSheetsParser from "public-google-sheets-parser";
import { formatOrdersList } from "../../../../utils/formatOrdersList";
import GetOrdersSheetUseCase from "./GetOrdersSheetUseCase";

export default class GetOrdersSheetController {
  constructor(private getOrdersSheetUseCase: GetOrdersSheetUseCase) {
    this.getOrdersSheetUseCase = getOrdersSheetUseCase;
  }
  async handle(request: Request, response: Response): Promise<Response | void> {
    try {
      const { id } = request.query as { id: string };

      if (!id) {
        return response.status(400).json({ error: "Missing google sheet id" });
      }

      const parsedSheet = new PublicGoogleSheetsParser(id);
      const rows = await parsedSheet.parse();

      const currentSheetOrders = [];

      for (const row of rows) {
        const rowValue = Object.values(row)[0] as string;

        const userId = Number(rowValue.substring(0, 10));
        const clientName = rowValue.substring(10, 55).trim();
        const orderId = Number(rowValue.substring(55, 65));
        const productId = Number(rowValue.substring(65, 75));
        const productValue = new Decimal(Number(rowValue.substring(75, 87)));
        const purchaseDate = this.formattedDate(rowValue.substring(87));

        await this.getOrdersSheetUseCase.execute({
          userId,
          clientName,
          orderId,
          productId,
          productValue,
          purchaseDate,
        });

        currentSheetOrders.push({
          userId,
          clientName,
          orderId,
          productId,
          productValue,
          purchaseDate,
        });
      }

      const data = formatOrdersList(currentSheetOrders);

      return response.status(201).json(data);
    } catch (error) {
      console.log("[GetOrdersSheetController]: unexpected error", { error });
      throw error;
    }
  }

  formattedDate(date: string) {
    const year = parseInt(date.substring(0, 4), 10);
    const month = parseInt(date.substring(4, 6), 10) - 1;
    const day = parseInt(date.substring(6, 8), 10);

    return new Date(year, month, day);
  }
}
