import { TGetOrderSheetDTO } from "../../../../types";
import { IOrderRepository } from "../../repositories/interfaces/IOrderRepository";

export default class GetOrdersSheetUseCase {
  constructor(private orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute({
    userId,
    clientName,
    orderId,
    productId,
    productValue,
    purchaseDate,
  }: TGetOrderSheetDTO) {
    const order = this.orderRepository.create({
      userId,
      clientName,
      orderId,
      productId,
      productValue,
      purchaseDate,
    });

    return order;
  }
}
