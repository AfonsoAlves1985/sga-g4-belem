import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as db from "./db";
import { InsertContractSpace } from "../drizzle/schema";

describe("Contract Spaces", () => {
  let createdSpaceId: number;

  beforeAll(async () => {
    // Clean up before tests
    const spaces = await db.listContractSpaces();
    for (const space of spaces) {
      try {
        await db.deleteContractSpace(space.id);
      } catch (e) {
        // Ignore errors during cleanup
      }
    }
  });

  afterAll(async () => {
    // Clean up after tests
    if (createdSpaceId) {
      try {
        await db.deleteContractSpace(createdSpaceId);
      } catch (e) {
        // Ignore errors during cleanup
      }
    }
  });

  it("should create a contract space", async () => {
    const spaceData: InsertContractSpace = {
      name: "Test Contract Space",
      description: "A test contract space",
      location: "Test Location",
    };

    const result = await db.createContractSpace(spaceData);
    expect(result).toBeDefined();
    
    // Get the ID from the created space
    const spaces = await db.listContractSpaces();
    const created = spaces.find((s) => s.name === "Test Contract Space");
    expect(created).toBeDefined();
    expect(created?.id).toBeGreaterThan(0);
    createdSpaceId = created!.id;
  })

  it("should list contract spaces", async () => {
    const spaces = await db.listContractSpaces();
    expect(Array.isArray(spaces)).toBe(true);
    expect(spaces.length).toBeGreaterThan(0);
    expect(spaces[0]).toHaveProperty("name");
    expect(spaces[0]).toHaveProperty("id");
  });

  it("should update a contract space", async () => {
    const updateData: Partial<InsertContractSpace> = {
      name: "Updated Contract Space",
      description: "Updated description",
    };

    const result = await db.updateContractSpace(createdSpaceId, updateData);
    expect(result).toBeDefined();

    const spaces = await db.listContractSpaces();
    const updated = spaces.find((s) => s.id === createdSpaceId);
    expect(updated?.name).toBe("Updated Contract Space");
    expect(updated?.description).toBe("Updated description");
  });

  it("should delete a contract space", async () => {
    const spaceData: InsertContractSpace = {
      name: "Space to Delete",
      description: "This will be deleted",
    };

    await db.createContractSpace(spaceData);
    
    // Get the ID from the created space
    const spaces = await db.listContractSpaces();
    const created = spaces.find((s) => s.name === "Space to Delete");
    expect(created).toBeDefined();
    const spaceIdToDelete = created!.id;

    await db.deleteContractSpace(spaceIdToDelete);

    const spacesAfter = await db.listContractSpaces();
    const deleted = spacesAfter.find((s) => s.id === spaceIdToDelete);
    expect(deleted).toBeUndefined();
  });
});
