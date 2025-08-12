import { TGetOrderSheetDTO, TOrdersFilter } from "../../../../types";
import { formatOrdersList } from "../../../../utils/formatOrdersList";
import { IOrderRepository } from "../../repositories/interfaces/IOrderRepository";

export default class GetAllOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({
    incomingOrders,
    filterBy,
    orderId,
    start,
    end,
  }: {
    incomingOrders?: TGetOrderSheetDTO[];
    filterBy: TOrdersFilter;
    orderId: string;
    start: string;
    end: string;
  }) {
    const orders =
      incomingOrders ||
      (await this.orderRepository.getAllOrders({
        filterBy,
        orderId,
        start,
        end,
      }));

    return formatOrdersList(orders);
  }
}
