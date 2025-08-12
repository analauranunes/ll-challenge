import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GetAllOrdersController from "../modules/orders/useCases/GetAllOrders/GetAllOrdersController";

const mockExecute = vi.fn();

const useCase = { execute: mockExecute };
const controller = new GetAllOrdersController(useCase as any);

const app = express();
app.get("/orders", (req, res) => controller.handle(req, res));

describe("GetAllOrders", () => {
  beforeEach(() => {
    mockExecute.mockReset();
  });

  it("should return all orders", async () => {
    mockExecute.mockResolvedValueOnce([{ orderId: 1, userId: 1 }]);

    const res = await request(app).get("/orders").query({ filterBy: "ALL" });

    expect(res.status).toBe(200);
    expect(mockExecute).toHaveBeenCalledWith({
      filterBy: "ALL",
      orderId: undefined,
      start: undefined,
      end: undefined,
      incomingOrders: undefined,
    });
    expect(res.body).toEqual([{ orderId: 1, userId: 1 }]);
  });

  it("should return order with filter 'ORDER_ID'", async () => {
    mockExecute.mockResolvedValueOnce([{ orderId: 10, userId: 2 }]);

    const res = await request(app)
      .get("/orders")
      .query({ filterBy: "ORDER_ID", id: "10" });

    expect(res.status).toBe(200);
    expect(mockExecute).toHaveBeenCalledWith({
      filterBy: "ORDER_ID",
      orderId: "10",
      start: undefined,
      end: undefined,
      incomingOrders: undefined,
    });
    expect(res.body).toEqual([{ orderId: 10, userId: 2 }]);
  });

  it("should return order with filter 'PERIOD'", async () => {
    mockExecute.mockResolvedValueOnce([{ orderId: 5, userId: 3 }]);

    const res = await request(app)
      .get("/orders")
      .query({ filterBy: "PERIOD", start: "2025-01-01", end: "2025-12-31" });

    expect(res.status).toBe(200);
    expect(mockExecute).toHaveBeenCalledWith({
      filterBy: "PERIOD",
      orderId: undefined,
      start: "2025-01-01",
      end: "2025-12-31",
      incomingOrders: undefined,
    });
    expect(res.body).toEqual([{ orderId: 5, userId: 3 }]);
  });
});
