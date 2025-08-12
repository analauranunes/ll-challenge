import { Decimal } from "@prisma/client/runtime/library";
import { describe, expect, it } from "vitest";
import { TGetOrderSheetDTO } from "../types";
import { formatOrdersList } from "./formatOrdersList";

const ordersMock: TGetOrderSheetDTO[] = [
  {
    userId: 1,
    clientName: "Jack",
    orderId: 100,
    productId: 10,
    productValue: new Decimal(50),
    purchaseDate: new Date("2023-01-01"),
  },
  {
    userId: 1,
    clientName: "Jack",
    orderId: 100,
    productId: 11,
    productValue: new Decimal(150),
    purchaseDate: new Date("2023-01-01"),
  },
  {
    userId: 2,
    clientName: "Judith",
    orderId: 200,
    productId: 20,
    productValue: new Decimal(75),
    purchaseDate: new Date("2023-02-01"),
  },
];

describe("formatOrdersList", () => {
  it("should group orders by user and order ID correctly", () => {
    const result = formatOrdersList(ordersMock);

    expect(result).toHaveLength(2);

    const user1 = result.find((u) => u.userId === 1)!;
    expect(user1.name).toBe("Jack");
    expect(user1.orders).toHaveLength(1);

    const order100 = user1.orders.find((o) => o.orderId === 100)!;
    expect(order100.products).toHaveLength(2);

    expect(order100.total.equals(new Decimal(200))).toBe(true);

    const user2 = result.find((u) => u.userId === 2)!;
    expect(user2.name).toBe("Judith");
    expect(user2.orders).toHaveLength(1);
    expect(user2.orders[0]?.products).toHaveLength(1);
    expect(user2.orders[0]?.total.equals(new Decimal(75))).toBe(true);
  });

  it("should not duplicate product or total if same productId already exists", () => {
    const ordersMock: TGetOrderSheetDTO[] = [
      {
        userId: 1,
        clientName: "Jack",
        orderId: 100,
        productId: 10,
        productValue: new Decimal(100),
        purchaseDate: new Date("2023-01-01"),
      },
      {
        userId: 1,
        clientName: "Jack",
        orderId: 100,
        productId: 10,
        productValue: new Decimal(100),
        purchaseDate: new Date("2023-01-01"),
      },
    ];

    const result = formatOrdersList(ordersMock);
    const user = result[0];
    const order = user?.orders[0];

    expect(order?.products).toHaveLength(1);
    expect(order?.total.equals(new Decimal(100))).toBe(true);
  });

  it("should return orders formatted correctly", () => {
    const result = formatOrdersList(ordersMock);

    expect(result).toEqual([
      {
        userId: 1,
        name: "Jack",
        orders: [
          {
            orderId: 100,
            purchaseDate: new Date("2023-01-01"),
            total: new Decimal(200),
            products: [
              { productId: 10, value: new Decimal(50) },
              { productId: 11, value: new Decimal(150) },
            ],
          },
        ],
      },
      {
        userId: 2,
        name: "Judith",
        orders: [
          {
            orderId: 200,
            purchaseDate: new Date("2023-02-01"),
            total: new Decimal(75),
            products: [{ productId: 20, value: new Decimal(75) }],
          },
        ],
      },
    ]);
  });

  it("should handle empty input array", () => {
    const result = formatOrdersList([]);
    expect(result).toEqual([]);
  });
});
