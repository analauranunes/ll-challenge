import { IOrderRepository } from "../../repositories/interfaces/IOrderRepository";
import { TGetOrderSheetDTO } from "./types";

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
