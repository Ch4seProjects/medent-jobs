import Link from "next/link";
import { Job } from "@/types/job";
import Pill from "./Pill";
import { formatPostedDate } from "@/util/formatPostedDate";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:items-center p-4 rounded-md hover:bg-zinc-300 transition-colors duration-200 ease-in-out border border-zinc-400"
    >
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold tracking-tight text-black">
          {job.title}
        </h1>
        <p className="text-sm text-zinc-600">{job.location}</p>
      </div>
      <div className="flex gap-2 h-8 md:h-3/4">
        <Pill text={job.type} />
        <Pill text={job.department} />
      </div>
      <p className="text-sm text-zinc-600">
        {`Posted ${formatPostedDate(job.postedDate)} ago`}
      </p>
    </Link>
  );
}
