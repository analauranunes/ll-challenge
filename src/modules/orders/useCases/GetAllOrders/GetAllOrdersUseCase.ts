import { formatOrdersList } from "../../../../utils/formatOrdersList";
import { IOrderRepository } from "../../repositories/interfaces/IOrderRepository";
import { TGetOrderSheetDTO } from "../GetOrdersSheet/types";

export default class GetAllOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(incomingOrders?: TGetOrderSheetDTO[]) {
    const orders =
      incomingOrders || (await this.orderRepository.getAllOrders());

    return formatOrdersList(orders);
  }
}
