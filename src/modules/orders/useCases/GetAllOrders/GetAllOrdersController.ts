import { Request, Response } from "express";
import GetAllOrdersUseCase from "./GetAllOrdersUseCase";

export default class GetAllOrdersController {
  constructor(private getAllOrdersUseCase: GetAllOrdersUseCase) {
    this.getAllOrdersUseCase = getAllOrdersUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response | void> {
    try {
      const data = await this.getAllOrdersUseCase.execute();

      return response.status(200).json(data);
    } catch (error) {
      console.log("GetAllOrdersController: unexpected error", { error });
    }
  }
}
