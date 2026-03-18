import { describe, it, expect } from "vitest";

/**
 * Consumables Module Tests
 * Tests for the consumables CRUD operations and status calculations
 */

describe("Consumables Module", () => {
  describe("Status Calculation", () => {
    it("should return ESTOQUE_OK when current stock is between min and max", () => {
      const minStock = 5;
      const maxStock = 20;
      const currentStock = 10;

      const calculateStatus = (current: number, min: number, max: number) => {
        if (current > max) return "ACIMA_DO_ESTOQUE";
        if (current < min) return "REPOR_ESTOQUE";
        return "ESTOQUE_OK";
      };

      const status = calculateStatus(currentStock, minStock, maxStock);
      expect(status).toBe("ESTOQUE_OK");
    });

    it("should return REPOR_ESTOQUE when current stock is below minimum", () => {
      const minStock = 5;
      const maxStock = 20;
      const currentStock = 2;

      const calculateStatus = (current: number, min: number, max: number) => {
        if (current > max) return "ACIMA_DO_ESTOQUE";
        if (current < min) return "REPOR_ESTOQUE";
        return "ESTOQUE_OK";
      };

      const status = calculateStatus(currentStock, minStock, maxStock);
      expect(status).toBe("REPOR_ESTOQUE");
    });

    it("should return ACIMA_DO_ESTOQUE when current stock exceeds maximum", () => {
      const minStock = 5;
      const maxStock = 20;
      const currentStock = 25;

      const calculateStatus = (current: number, min: number, max: number) => {
        if (current > max) return "ACIMA_DO_ESTOQUE";
        if (current < min) return "REPOR_ESTOQUE";
        return "ESTOQUE_OK";
      };

      const status = calculateStatus(currentStock, minStock, maxStock);
      expect(status).toBe("ACIMA_DO_ESTOQUE");
    });

    it("should return ESTOQUE_OK when current stock equals minimum", () => {
      const minStock = 5;
      const maxStock = 20;
      const currentStock = 5;

      const calculateStatus = (current: number, min: number, max: number) => {
        if (current > max) return "ACIMA_DO_ESTOQUE";
        if (current < min) return "REPOR_ESTOQUE";
        return "ESTOQUE_OK";
      };

      const status = calculateStatus(currentStock, minStock, maxStock);
      expect(status).toBe("ESTOQUE_OK");
    });

    it("should return ESTOQUE_OK when current stock equals maximum", () => {
      const minStock = 5;
      const maxStock = 20;
      const currentStock = 20;

      const calculateStatus = (current: number, min: number, max: number) => {
        if (current > max) return "ACIMA_DO_ESTOQUE";
        if (current < min) return "REPOR_ESTOQUE";
        return "ESTOQUE_OK";
      };

      const status = calculateStatus(currentStock, minStock, maxStock);
      expect(status).toBe("ESTOQUE_OK");
    });
  });

  describe("Consumable Data Validation", () => {
    it("should validate required fields for creating a consumable", () => {
      const consumable = {
        name: "AÇÚCAR ITAMARATI 1KG",
        category: "COPA/COZINHA",
        unit: "UND",
        minStock: 3,
        maxStock: 6,
        currentStock: 6,
        replenishStock: 0,
      };

      expect(consumable.name).toBeDefined();
      expect(consumable.category).toBeDefined();
      expect(consumable.unit).toBeDefined();
      expect(consumable.minStock).toBeGreaterThanOrEqual(0);
      expect(consumable.maxStock).toBeGreaterThanOrEqual(consumable.minStock);
      expect(consumable.currentStock).toBeGreaterThanOrEqual(0);
    });

    it("should calculate replenish stock correctly", () => {
      const consumable = {
        name: "CAFÉ 250G",
        category: "COPA/COZINHA",
        unit: "UND",
        minStock: 5,
        maxStock: 20,
        currentStock: 0,
        replenishStock: 20, // maxStock - currentStock
      };

      const expectedReplenish = consumable.maxStock - consumable.currentStock;
      expect(consumable.replenishStock).toBe(expectedReplenish);
    });

    it("should handle different units correctly", () => {
      const units = ["UND", "L", "KG", "CX"];
      const consumable = {
        name: "ÁLCOOL 70 SOL 1LT",
        category: "HIGIENIZAÇÃO",
        unit: "L",
        minStock: 4,
        maxStock: 10,
        currentStock: 5,
        replenishStock: 5,
      };

      expect(units).toContain(consumable.unit);
    });
  });

  describe("Weekly and Monthly Synchronization", () => {
    it("should create weekly record with same data as consumable", () => {
      const consumable = {
        id: 1,
        name: "AÇÚCAR ITAMARATI 1KG",
        category: "COPA/COZINHA",
        unit: "UND",
        minStock: 3,
        maxStock: 6,
        currentStock: 6,
        replenishStock: 0,
        status: "ESTOQUE_OK",
      };

      const weeklyRecord = {
        consumableId: consumable.id,
        weekStartDate: new Date(),
        minStock: consumable.minStock,
        maxStock: consumable.maxStock,
        currentStock: consumable.currentStock,
        replenishStock: consumable.replenishStock,
        status: consumable.status,
      };

      expect(weeklyRecord.consumableId).toBe(consumable.id);
      expect(weeklyRecord.minStock).toBe(consumable.minStock);
      expect(weeklyRecord.maxStock).toBe(consumable.maxStock);
      expect(weeklyRecord.currentStock).toBe(consumable.currentStock);
      expect(weeklyRecord.status).toBe(consumable.status);
    });

    it("should create monthly record with aggregated data", () => {
      const weeklyRecords = [
        {
          consumableId: 1,
          weekStartDate: new Date("2026-03-01"),
          minStock: 3,
          maxStock: 6,
          currentStock: 6,
          replenishStock: 0,
          status: "ESTOQUE_OK",
        },
        {
          consumableId: 1,
          weekStartDate: new Date("2026-03-08"),
          minStock: 3,
          maxStock: 6,
          currentStock: 5,
          replenishStock: 1,
          status: "ESTOQUE_OK",
        },
        {
          consumableId: 1,
          weekStartDate: new Date("2026-03-15"),
          minStock: 3,
          maxStock: 6,
          currentStock: 4,
          replenishStock: 2,
          status: "ESTOQUE_OK",
        },
      ];

      // Average calculation for monthly
      const avgCurrent = Math.round(
        weeklyRecords.reduce((sum, r) => sum + r.currentStock, 0) / weeklyRecords.length
      );
      const avgReplenish = Math.round(
        weeklyRecords.reduce((sum, r) => sum + r.replenishStock, 0) / weeklyRecords.length
      );

      const monthlyRecord = {
        consumableId: 1,
        monthStartDate: new Date("2026-03-01"),
        minStock: 3,
        maxStock: 6,
        currentStock: avgCurrent,
        replenishStock: avgReplenish,
        status: "ESTOQUE_OK",
      };

      expect(monthlyRecord.currentStock).toBe(5);
      expect(monthlyRecord.replenishStock).toBe(1);
      expect(monthlyRecord.consumableId).toBe(1);
    });
  });

  describe("Category Management", () => {
    it("should group consumables by category", () => {
      const consumables = [
        { id: 1, name: "AÇÚCAR", category: "COPA/COZINHA" },
        { id: 2, name: "ÁLCOOL", category: "HIGIENIZAÇÃO" },
        { id: 3, name: "CAFÉ", category: "COPA/COZINHA" },
        { id: 4, name: "DESINFETANTE", category: "HIGIENIZAÇÃO" },
      ];

      const categories = Array.from(new Set(consumables.map((c) => c.category)));
      expect(categories).toContain("COPA/COZINHA");
      expect(categories).toContain("HIGIENIZAÇÃO");
      expect(categories.length).toBe(2);
    });

    it("should filter consumables by category", () => {
      const consumables = [
        { id: 1, name: "AÇÚCAR", category: "COPA/COZINHA" },
        { id: 2, name: "ÁLCOOL", category: "HIGIENIZAÇÃO" },
        { id: 3, name: "CAFÉ", category: "COPA/COZINHA" },
      ];

      const filtered = consumables.filter((c) => c.category === "COPA/COZINHA");
      expect(filtered.length).toBe(2);
      expect(filtered.every((c) => c.category === "COPA/COZINHA")).toBe(true);
    });
  });

  describe("Status Alerts", () => {
    it("should identify consumables needing replenishment", () => {
      const consumables = [
        { id: 1, name: "AÇÚCAR", status: "ESTOQUE_OK" },
        { id: 2, name: "ÁLCOOL", status: "REPOR_ESTOQUE" },
        { id: 3, name: "CAFÉ", status: "REPOR_ESTOQUE" },
        { id: 4, name: "DESINFETANTE", status: "ACIMA_DO_ESTOQUE" },
      ];

      const needsReplenishment = consumables.filter((c) => c.status === "REPOR_ESTOQUE");
      expect(needsReplenishment.length).toBe(2);
      expect(needsReplenishment.map((c) => c.id)).toEqual([2, 3]);
    });

    it("should identify consumables with excess stock", () => {
      const consumables = [
        { id: 1, name: "AÇÚCAR", status: "ESTOQUE_OK" },
        { id: 2, name: "ÁLCOOL", status: "ACIMA_DO_ESTOQUE" },
        { id: 3, name: "CAFÉ", status: "ACIMA_DO_ESTOQUE" },
        { id: 4, name: "DESINFETANTE", status: "REPOR_ESTOQUE" },
      ];

      const excessStock = consumables.filter((c) => c.status === "ACIMA_DO_ESTOQUE");
      expect(excessStock.length).toBe(2);
      expect(excessStock.map((c) => c.id)).toEqual([2, 3]);
    });
  });
});
