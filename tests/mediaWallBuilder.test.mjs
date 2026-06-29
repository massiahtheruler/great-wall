import assert from "node:assert/strict";
import test from "node:test";
import createJiti from "jiti";

const jiti = createJiti(import.meta.url);
const {
  builderModels,
  buildBuilderEstimateLines,
  calculateBuilderTotal,
  formatEstimatePrice,
  getBuilderProofProject,
} = jiti("../lib/mediaWallBuilder.ts");

test("buildBuilderEstimateLines returns base, selected upgrades, and total", () => {
  const model = builderModels.find((entry) => entry.id === "bp2");
  const lines = buildBuilderEstimateLines(model, ["soundbar", "ledLighting"]);

  assert.deepEqual(lines, [
    { label: "Model BP2 base wall", amount: 4000, kind: "base" },
    { label: "Soundbar niche", amount: 350, kind: "upgrade" },
    { label: "LED lighting", amount: 450, kind: "upgrade" },
    { label: "Estimated starting price", amount: 4800, kind: "total" },
  ]);
});

test("calculateBuilderTotal ignores unknown option ids defensively", () => {
  const model = builderModels[0];

  assert.equal(calculateBuilderTotal(model, ["soundbar", "unknown-option"]), 3850);
});

test("formatEstimatePrice returns whole-dollar US currency", () => {
  assert.equal(formatEstimatePrice(5400), "$5,400");
});

test("getBuilderProofProject prioritizes shelves over mantel over basic", () => {
  assert.equal(getBuilderProofProject(["soundbar"]).title, "Stone fireplace wall");
  assert.equal(
    getBuilderProofProject(["soundbar", "mantel"]).title,
    "Mantel feature wall",
  );
  assert.equal(
    getBuilderProofProject(["soundbar", "mantel", "sideShelves"]).title,
    "Built-in shelving layout",
  );
});
