import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as db from "./db";

describe("Maintenance Spaces", () => {
  let spaceId: number;

  beforeAll(async () => {
    // Limpar dados de teste anteriores
    const spaces = await db.listMaintenanceSpaces();
    for (const space of spaces) {
      if (space.name.includes("Test")) {
        await db.deleteMaintenanceSpace(space.id);
      }
    }
  });

  afterAll(async () => {
    // Limpar dados de teste
    if (spaceId) {
      try {
        await db.deleteMaintenanceSpace(spaceId);
      } catch (e) {
        // Já foi deletado
      }
    }
  });

  it("should create a maintenance space", async () => {
    const result = await db.createMaintenanceSpace({
      name: "Test Space 1",
      description: "Test description",
    });

    expect(result).toBeDefined();
    const spaces = await db.listMaintenanceSpaces();
    const created = spaces.find((s) => s.name === "Test Space 1");
    expect(created).toBeDefined();
    expect(created?.description).toBe("Test description");
    spaceId = created!.id;
  });

  it("should list maintenance spaces", async () => {
    const spaces = await db.listMaintenanceSpaces();
    expect(Array.isArray(spaces)).toBe(true);
    expect(spaces.length).toBeGreaterThan(0);
  });

  it("should update a maintenance space", async () => {
    await db.updateMaintenanceSpace(spaceId, {
      name: "Test Space Updated",
      description: "Updated description",
    });

    const spaces = await db.listMaintenanceSpaces();
    const updated = spaces.find((s) => s.id === spaceId);
    expect(updated?.name).toBe("Test Space Updated");
    expect(updated?.description).toBe("Updated description");
  });

  it("should delete a maintenance space", async () => {
    const spaceToDelete = await db.createMaintenanceSpace({
      name: "Test Space to Delete",
      description: "Will be deleted",
    });

    const spaces = await db.listMaintenanceSpaces();
    const created = spaces.find((s) => s.name === "Test Space to Delete");
    expect(created).toBeDefined();

    await db.deleteMaintenanceSpace(created!.id);

    const spacesAfter = await db.listMaintenanceSpaces();
    const deleted = spacesAfter.find((s) => s.id === created!.id);
    expect(deleted).toBeUndefined();
  });
});
