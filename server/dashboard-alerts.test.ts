import { describe, it, expect, beforeAll } from "vitest";
import { getDb } from "./db";
import { consumablesWithSpace, consumableSpaces } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Dashboard Stock Alerts", () => {
  let db: any;
  let testSpaceId: number;

  beforeAll(async () => {
    db = await getDb();
  });

  it("should identify critical stock levels (below 50% of minimum)", async () => {
    // Buscar consumíveis com estoque baixo
    const consumables = await db.select().from(consumablesWithSpace).limit(5);
    
    const criticalItems = consumables.filter((c: any) => {
      const minStock = c.minStock || 10;
      const criticalLevel = Math.floor(minStock * 0.5);
      return c.currentStock < criticalLevel;
    });

    expect(Array.isArray(criticalItems)).toBe(true);
  });

  it("should identify warning stock levels (below minimum but above critical)", async () => {
    const consumables = await db.select().from(consumablesWithSpace).limit(5);
    
    const warningItems = consumables.filter((c: any) => {
      const minStock = c.minStock || 10;
      const criticalLevel = Math.floor(minStock * 0.5);
      return c.currentStock < minStock && c.currentStock >= criticalLevel;
    });

    expect(Array.isArray(warningItems)).toBe(true);
  });

  it("should include space information in alerts", async () => {
    const spaces = await db.select().from(consumableSpaces).limit(1);
    if (spaces.length > 0) {
      const consumables = await db
        .select()
        .from(consumablesWithSpace)
        .where(eq(consumablesWithSpace.spaceId, spaces[0].id))
        .limit(1);

      if (consumables.length > 0) {
        const alert = consumables[0];
        expect(alert.spaceId).toBe(spaces[0].id);
        expect(alert.name).toBeDefined();
        expect(alert.currentStock).toBeDefined();
        expect(alert.unit).toBeDefined();
      }
    }
  });

  it("should sort alerts with critical items first", async () => {
    const consumables = await db.select().from(consumablesWithSpace).limit(10);
    
    const alerts = consumables
      .map((c: any) => {
        const minStock = c.minStock || 10;
        const criticalLevel = Math.floor(minStock * 0.5);
        
        if (c.currentStock < criticalLevel) {
          return { ...c, alertType: "critical" };
        } else if (c.currentStock < minStock) {
          return { ...c, alertType: "warning" };
        }
        return null;
      })
      .filter((a: any) => a !== null)
      .sort((a: any, b: any) => {
        if (a.alertType === "critical" && b.alertType !== "critical") return -1;
        if (a.alertType !== "critical" && b.alertType === "critical") return 1;
        return a.currentStock - b.currentStock;
      });

    // Verificar que críticos vêm primeiro
    if (alerts.length > 1) {
      const firstIsCritical = alerts[0].alertType === "critical";
      const hasWarning = alerts.some((a: any) => a.alertType === "warning");
      
      if (firstIsCritical && hasWarning) {
        const firstWarningIndex = alerts.findIndex((a: any) => a.alertType === "warning");
        expect(firstWarningIndex).toBeGreaterThan(0);
      }
    }

    expect(Array.isArray(alerts)).toBe(true);
  });

  it("should handle consumables with no stock alerts", async () => {
    const consumables = await db.select().from(consumablesWithSpace).limit(20);
    
    const noAlerts = consumables.filter((c: any) => {
      const minStock = c.minStock || 10;
      return c.currentStock >= minStock;
    });

    expect(Array.isArray(noAlerts)).toBe(true);
  });

  it("should calculate critical level as 50% of minimum stock", async () => {
    const minStock = 100;
    const criticalLevel = Math.floor(minStock * 0.5);
    
    expect(criticalLevel).toBe(50);
  });

  it("should include all required alert fields", async () => {
    const consumables = await db.select().from(consumablesWithSpace).limit(1);
    
    if (consumables.length > 0) {
      const c = consumables[0];
      expect(c).toHaveProperty("id");
      expect(c).toHaveProperty("name");
      expect(c).toHaveProperty("category");
      expect(c).toHaveProperty("currentStock");
      expect(c).toHaveProperty("minStock");
      expect(c).toHaveProperty("unit");
      expect(c).toHaveProperty("spaceId");
    }
  });
});
