import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as db from "./db";
import { InsertSupplierSpace } from "../drizzle/schema";

describe("Supplier Spaces", () => {
  let createdSpaceId: number;

  beforeAll(async () => {
    // Clean up before tests
    const spaces = await db.listSupplierSpaces();
    for (const space of spaces) {
      try {
        await db.deleteSupplierSpace(space.id);
      } catch (e) {
        // Ignore errors during cleanup
      }
    }
  });

  afterAll(async () => {
    // Clean up after tests
    if (createdSpaceId) {
      try {
        await db.deleteSupplierSpace(createdSpaceId);
      } catch (e) {
        // Ignore errors during cleanup
      }
    }
  });

  it("should create a supplier space", async () => {
    const spaceData: InsertSupplierSpace = {
      name: "Test Supplier Space",
      description: "A test supplier space",
      location: "Test Location",
    };

    const result = await db.createSupplierSpace(spaceData);
    expect(result).toBeDefined();
    
    // Get the ID from the created space
    const spaces = await db.listSupplierSpaces();
    const created = spaces.find((s) => s.name === "Test Supplier Space");
    expect(created).toBeDefined();
    expect(created?.id).toBeGreaterThan(0);
    createdSpaceId = created!.id;
  })

  it("should list supplier spaces", async () => {
    const spaces = await db.listSupplierSpaces();
    expect(Array.isArray(spaces)).toBe(true);
    expect(spaces.length).toBeGreaterThan(0);
    expect(spaces[0]).toHaveProperty("name");
    expect(spaces[0]).toHaveProperty("id");
  });

  it("should update a supplier space", async () => {
    const updateData: Partial<InsertSupplierSpace> = {
      name: "Updated Supplier Space",
      description: "Updated description",
    };

    const result = await db.updateSupplierSpace(createdSpaceId, updateData);
    expect(result).toBeDefined();

    const spaces = await db.listSupplierSpaces();
    const updated = spaces.find((s) => s.id === createdSpaceId);
    expect(updated?.name).toBe("Updated Supplier Space");
    expect(updated?.description).toBe("Updated description");
  });

  it("should delete a supplier space", async () => {
    const spaceData: InsertSupplierSpace = {
      name: "Space to Delete",
      description: "This will be deleted",
    };

    await db.createSupplierSpace(spaceData);
    
    // Get the ID from the created space
    const spaces = await db.listSupplierSpaces();
    const created = spaces.find((s) => s.name === "Space to Delete");
    expect(created).toBeDefined();
    const spaceIdToDelete = created!.id;

    await db.deleteSupplierSpace(spaceIdToDelete);

    const spacesAfter = await db.listSupplierSpaces();
    const deleted = spacesAfter.find((s) => s.id === spaceIdToDelete);
    expect(deleted).toBeUndefined();
  });
});
