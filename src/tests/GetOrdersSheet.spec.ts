import express from "express";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import GetOrdersSheetController from "../modules/orders/useCases/GetOrdersSheet/GetOrdersSheetController";

vi.mock("public-google-sheets-parser", () => {
  return {
    default: class {
      id: string;
      constructor(id: string) {
        this.id = id;
      }

      async parse() {
        return [
          {
            row: "0000000080                                 Tabitha Kuhn00000008750000000004      386.7120210525",
          },
          {
            row: "0000000027                             Georgetta Skiles00000003060000000003      384.5220211123",
          },
        ];
      }
    },
  };
});

describe("GetOrdersSheet", () => {
  const mockExecute = vi.fn();

  const useCase = {
    execute: mockExecute,
  };

  const controller = new GetOrdersSheetController(useCase as any);

  const app = express();
  app.get("/orders/sheet", (req, res) => controller.handle(req, res));

  beforeEach(() => {
    mockExecute.mockReset();
  });

  it("should return error when sheetId is missing", async () => {
    const res = await request(app).get("/orders/sheet");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Missing google sheet id" });
  });

  it("should return valid sheet and formatted orders", async () => {
    mockExecute.mockImplementation(async (data) => data);

    const res = await request(app)
      .get("/orders/sheet")
      .query({ id: "fake-sheet-id" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual([
      {
        userId: 80,
        name: "Tabitha Kuhn",
        orders: [
          {
            orderId: 875,
            purchaseDate: new Date("2021-05-25T03:00:00.000Z").toISOString(),
            total: "386.71",
            products: [{ productId: 4, value: "386.71" }],
          },
        ],
      },
      {
        userId: 27,
        name: "Georgetta Skiles",
        orders: [
          {
            orderId: 306,
            purchaseDate: new Date("2021-11-23T03:00:00.000Z").toISOString(),
            total: "384.52",
            products: [{ productId: 3, value: "384.52" }],
          },
        ],
      },
    ]);
    expect(mockExecute).toHaveBeenCalled();
  });
});
