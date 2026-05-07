import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatPostedDate, formatClosingDate } from "@/util/formatDate";

describe("formatPostedDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-07T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns seconds when posted less than a minute ago", () => {
    const posted = new Date("2026-05-07T11:59:30Z").toISOString();
    expect(formatPostedDate(posted)).toBe("30s");
  });

  it("returns minutes when posted less than an hour ago", () => {
    const posted = new Date("2026-05-07T11:45:00Z").toISOString();
    expect(formatPostedDate(posted)).toBe("15m");
  });

  it("returns hours when posted less than a day ago", () => {
    const posted = new Date("2026-05-07T06:00:00Z").toISOString();
    expect(formatPostedDate(posted)).toBe("6hr");
  });

  it("returns days when posted less than a week ago", () => {
    const posted = new Date("2026-05-04T12:00:00Z").toISOString();
    expect(formatPostedDate(posted)).toBe("3d");
  });

  it("returns weeks when posted less than a month ago", () => {
    const posted = new Date("2026-04-23T12:00:00Z").toISOString();
    expect(formatPostedDate(posted)).toBe("2w");
  });

  it("returns months when posted less than a year ago", () => {
    const posted = new Date("2026-02-07T12:00:00Z").toISOString();
    expect(formatPostedDate(posted)).toBe("2mo");
  });

  it("returns years when posted more than a year ago", () => {
    const posted = new Date("2024-05-07T12:00:00Z").toISOString();
    expect(formatPostedDate(posted)).toBe("2y");
  });
});

describe("formatClosingDate", () => {
  it("returns 'Open until filled' when closingDate is null", () => {
    expect(formatClosingDate(null)).toBe("Open until filled");
  });

  it("formats a valid closing date correctly", () => {
    expect(formatClosingDate("2026-05-15")).toBe("Closes May 15, 2026");
  });

  it("formats another valid closing date correctly", () => {
    expect(formatClosingDate("2026-06-01")).toBe("Closes June 1, 2026");
  });
});
