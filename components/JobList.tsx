import { Job } from "@/types/job";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <ul className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
      {jobs.length === 0 ? (
        <li className="text-zinc-500">No jobs match your filters.</li>
      ) : (
        jobs.map((job) => <JobCard job={job} key={job.id} />)
      )}
    </ul>
  );
}
