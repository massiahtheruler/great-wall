import assert from "node:assert/strict";
import test from "node:test";
import createJiti from "jiti";

const jiti = createJiti(import.meta.url);
const { contractorProgram } = jiti("../lib/contractorProgram.ts");

test("contractorProgram explains the partner value clearly", () => {
  assert.equal(contractorProgram.heading, "Join the Great Wall contractor network");
  assert.ok(contractorProgram.benefits.includes("First look at new unit offers"));
  assert.ok(contractorProgram.benefits.includes("Qualified leads sent directly to you"));
});

test("contractorProgram includes contest and award hooks", () => {
  assert.deepEqual(contractorProgram.awards, [
    "Best in Show",
    "Most Installed",
    "Highest Rated",
    "Cleanest Finish",
  ]);
});
