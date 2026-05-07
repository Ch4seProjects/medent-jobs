import { describe, it, expect } from "vitest";
import type { JobType } from "@/types/job";
import { mapEmploymentType } from "@/util/mapEmploymentType";

describe("mapEmploymentType", () => {
  it('maps "Full-time" to "FULL_TIME"', () => {
    expect(mapEmploymentType("Full-time")).toBe("FULL_TIME");
  });

  it('maps "Part-time" to "PART_TIME"', () => {
    expect(mapEmploymentType("Part-time")).toBe("PART_TIME");
  });

  it('maps "Contract" to "CONTRACTOR"', () => {
    expect(mapEmploymentType("Contract")).toBe("CONTRACTOR");
  });

  it('returns "OTHER" for an unrecognized type', () => {
    expect(mapEmploymentType("Casual" as JobType)).toBe("OTHER");
  });
});
