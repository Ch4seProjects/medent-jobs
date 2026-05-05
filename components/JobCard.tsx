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
      className="group flex justify-between items-center p-4 rounded-md hover:bg-zinc-300 transition-colors duration-200 ease-in-out"
    >
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold tracking-tight text-black">
          {job.title}
        </h1>
        <p className="text-sm text-zinc-600">{job.location}</p>
      </div>
      <div className="flex gap-2 h-full">
        <Pill text={job.type} />
        <Pill text={job.department} />
      </div>
      <p className="text-sm text-zinc-600">
        {formatPostedDate(job.postedDate)}
      </p>
    </Link>
  );
}
