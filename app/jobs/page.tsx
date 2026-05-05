import { getJobs } from "@/lib/jobs";
import GlobalLayout from "@/components/GlobalLayout";
import Header from "@/components/Header";
import JobList from "@/components/JobList";
import Filter from "@/components/Filter";

export default async function JobPage() {
  const jobs = await getJobs();

  return (
    <GlobalLayout>
      <Header
        title="Job Listing Page"
        subTitle="This is where you can see all the jobs that are available."
      />

      <div className="flex flex-col md:flex-row flex-1 min-h-0 w-full">
        <Filter />
        <JobList jobs={jobs} />
      </div>
    </GlobalLayout>
  );
}
