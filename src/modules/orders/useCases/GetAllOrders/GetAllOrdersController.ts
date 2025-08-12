import { Request, Response } from "express";
import { TOrdersFilter } from "../../../../types";
import GetAllOrdersUseCase from "./GetAllOrdersUseCase";

export default class GetAllOrdersController {
  constructor(private getAllOrdersUseCase: GetAllOrdersUseCase) {
    this.getAllOrdersUseCase = getAllOrdersUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response | void> {
    try {
      const { filterBy, id, start, end } = request.query as {
        filterBy: TOrdersFilter;
        id: string;
        start: string;
        end: string;
      };
      const data = await this.getAllOrdersUseCase.execute({
        filterBy,
        orderId: id,
        start,
        end,
      });

      return response.status(200).json(data);
    } catch (error) {
      console.log("[GetAllOrdersController]: unexpected error", { error });
    }
  }
}
