import type { Job } from "@/types/job";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const baseJob: Job = {
  id: "JOB-001",
  title: "Paediatrician",
  slug: "paediatrician",
  location: "Auckland, NZ",
  type: "Full-time",
  department: "Paediatrics",
  postedDate: "2026-04-01",
  closingDate: "2026-05-15",
  salary: { min: 220000, max: 280000, currency: "NZD" },
  description:
    "We are seeking a Consultant Paediatrician to join our multidisciplinary team delivering specialist child health services across the Auckland region. You will provide expert assessment, diagnosis, and management for a broad range of paediatric conditions, and contribute to clinical governance and teaching.",
  requirements: [
    "Fellowship of the Royal Australasian College of Physicians (FRACP) or equivalent",
    "Vocational registration with the Medical Council of New Zealand",
    "Demonstrated experience in general paediatrics or a paediatric subspecialty",
  ],
};

vi.mock("@/lib/jobs", () => ({
  getJobBySlug: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/components/GlobalLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("@/components/Header", () => ({
  default: () => null,
}));
vi.mock("@/components/ApplyButton", () => ({
  default: () => <button>Apply</button>,
}));
vi.mock("@/components/InfoCard", () => ({
  InfoCard: ({ label, value }: { label: string; value: string }) => (
    <div data-testid={`info-card-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      {value}
    </div>
  ),
}));

import JobDetailPage from "@/app/jobs/[slug]/page";
import { getJobBySlug } from "@/lib/jobs";
import { notFound } from "next/navigation";
import { formatClosingDate } from "@/util/formatDate";

async function renderPage(slug: string) {
  const ui = await JobDetailPage({ params: Promise.resolve({ slug }) });
  return render(ui);
}

describe("/jobs/[slug] page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when the job exists", () => {
    beforeEach(() => {
      vi.mocked(getJobBySlug).mockResolvedValue(baseJob);
    });

    it("renders the job title", async () => {
      await renderPage("paediatrician");
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Paediatrician",
      );
    });

    it("renders the job location", async () => {
      await renderPage("paediatrician");
      expect(screen.getByText("Auckland, NZ")).toBeInTheDocument();
    });

    it("renders department via InfoCard", async () => {
      await renderPage("paediatrician");
      expect(screen.getByTestId("info-card-department")).toHaveTextContent(
        "Paediatrics",
      );
    });

    it("renders employee type via InfoCard", async () => {
      await renderPage("paediatrician");
      expect(screen.getByTestId("info-card-employee-type")).toHaveTextContent(
        "Full-time",
      );
    });

    it("renders salary range via InfoCard", async () => {
      await renderPage("paediatrician");
      expect(screen.getByTestId("info-card-offer-salary")).toHaveTextContent(
        "NZD 220,000 - 280,000/year",
      );
    });

    it("renders the posted date", async () => {
      await renderPage("paediatrician");
      expect(
        screen.getByText(
          (text) => text.includes("Posted") && text.includes("ago"),
        ),
      ).toBeInTheDocument();
    });

    it("renders the closing date when set", async () => {
      await renderPage("paediatrician");
      const expected = formatClosingDate("2026-05-15");
      expect(
        screen.getByText((text) => text.includes(expected)),
      ).toBeInTheDocument();
    });

    it("renders the description heading and body", async () => {
      await renderPage("paediatrician");
      expect(
        screen.getByRole("heading", { name: /description/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "We are seeking a Consultant Paediatrician to join our multidisciplinary team delivering specialist child health services across the Auckland region. You will provide expert assessment, diagnosis, and management for a broad range of paediatric conditions, and contribute to clinical governance and teaching.",
        ),
      ).toBeInTheDocument();
    });

    it("renders the requirements heading and each requirement as a list item", async () => {
      await renderPage("paediatrician");
      expect(
        screen.getByRole("heading", { name: /requirements/i }),
      ).toBeInTheDocument();

      const items = screen.getAllByRole("listitem");
      const texts = items.map((li) => li.textContent);
      expect(texts).toEqual(
        expect.arrayContaining([
          "Fellowship of the Royal Australasian College of Physicians (FRACP) or equivalent",
          "Vocational registration with the Medical Council of New Zealand",
          "Demonstrated experience in general paediatrics or a paediatric subspecialty",
        ]),
      );
    });
  });

  describe("when closingDate is null", () => {
    it('renders "Open until filled" instead of a date', async () => {
      vi.mocked(getJobBySlug).mockResolvedValue({
        ...baseJob,
        closingDate: null,
      });

      await renderPage("paediatrician");

      expect(
        screen.getByText((text) => text.includes("Open until filled")),
      ).toBeInTheDocument();
    });
  });

  describe("when the slug does not exist", () => {
    it("calls notFound() and throws for an unknown slug", async () => {
      vi.mocked(getJobBySlug).mockResolvedValue(null);

      await expect(renderPage("non-existent")).rejects.toThrow(
        "NEXT_NOT_FOUND",
      );
      expect(notFound).toHaveBeenCalledOnce();
    });
  });
});
