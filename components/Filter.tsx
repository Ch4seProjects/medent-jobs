"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import { JobType, Department } from "@/types/job";

interface FilterProps {
  departments: Department[];
  jobTypes: JobType[];
}

export default function Filter({ departments, jobTypes }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedDepartments = searchParams.getAll("department");
  const selectedTypes = searchParams.getAll("type");

  const toggle = (key: "department" | "type", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll(key);

    params.delete(key);
    if (current.includes(value)) {
      current.filter((v) => v !== value).forEach((v) => params.append(key, v));
    } else {
      [...current, value].forEach((v) => params.append(key, v));
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex md:border-r flex-col md:p-4 md:gap-8 shrink-0 w-full md:w-64">
      <h1 className="text-xl font-semibold tracking-tight text-black">
        Filters
      </h1>

      <div className="flex md:flex-col gap-4">
        <FilterSection title="Department">
          <ul className="flex flex-col gap-2 mt-2 absolute md:relative bg-zinc-50 w-full p-2 md:p-0">
            {departments.map((dept) => (
              <li key={dept} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={dept}
                  value={dept}
                  checked={selectedDepartments.includes(dept)}
                  onChange={() => toggle("department", dept)}
                />
                <label htmlFor={dept}>{dept}</label>
              </li>
            ))}
          </ul>
        </FilterSection>
        <FilterSection title="Employment">
          <ul className="flex flex-col gap-2 mt-2 absolute md:relative bg-zinc-50 w-full p-2 md:p-0">
            {jobTypes.map((type) => (
              <li key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={type}
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggle("type", type)}
                />
                <label htmlFor={type}>{type}</label>
              </li>
            ))}
          </ul>
        </FilterSection>
      </div>
    </div>
  );
}
