import { JobType } from "@/types/job";

export function mapEmploymentType(type: JobType): string {
  const map: Record<string, string> = {
    "Full-time": "FULL_TIME",
    "Part-time": "PART_TIME",
    Contract: "CONTRACTOR",
  };
  return map[type] ?? "OTHER";
}
