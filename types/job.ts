export type JobType = "Full-time" | "Part-time" | "Contract";
export type Department =
  | "Anaesthesia"
  | "Emergency Medicine"
  | "Mental Health"
  | "Paediatrics"
  | "Primary Care";

export type Currency = "NZD";
export type Salary = {
  min: number;
  max: number;
  currency: Currency;
};

export type Job = {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: JobType;
  department: Department;
  postedDate: string;
  closingDate: string | null;
  salary: Salary;
  description: string;
  requirements: string[];
};
