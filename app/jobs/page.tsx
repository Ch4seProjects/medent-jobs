import { Metadata } from "next";
import { getJobs } from "@/lib/jobs";
import GlobalLayout from "@/components/GlobalLayout";
import Header from "@/components/Header";
import JobList from "@/components/JobList";
import Filter from "@/components/Filter";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { department?: string; type?: string };
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    title: "Jobs",
    description:
      "Browse specialist medical job opportunities across New Zealand. Find roles in paediatrics, emergency medicine, general practice, anaesthesia, psychiatry, and more.",
    alternates: {
      canonical: `${baseUrl}/jobs`,
    },
  };
}

interface JobPageProps {
  searchParams: Promise<{
    department?: string | string[];
    type?: string | string[];
  }>;
}

export default async function JobPage({ searchParams }: JobPageProps) {
  const jobs = await getJobs();
  const { department, type } = await searchParams;

  const departments = [...new Set(jobs.map((job) => job.department))];
  const jobTypes = [...new Set(jobs.map((job) => job.type))];

  const selectedDepartments = department
    ? Array.isArray(department)
      ? department
      : [department]
    : [];

  const selectedTypes = type ? (Array.isArray(type) ? type : [type]) : [];

  const filteredJobs = jobs.filter((job) => {
    const deptMatch =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(job.department);
    const typeMatch =
      selectedTypes.length === 0 || selectedTypes.includes(job.type);
    return deptMatch && typeMatch;
  });

  return (
    <GlobalLayout>
      <Header
        title="Job Feed"
        subTitle="Specialist medical opportunities across New Zealand"
      />

      <div className="flex flex-col gap-4 md:flex-row flex-1 min-h-0 w-full">
        <Filter departments={departments} jobTypes={jobTypes} />
        <JobList jobs={filteredJobs} />
      </div>
    </GlobalLayout>
  );
}
