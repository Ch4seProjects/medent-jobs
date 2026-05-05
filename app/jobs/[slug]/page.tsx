import GlobalLayout from "@/components/GlobalLayout";
import Header from "@/components/Header";
import { InfoCard } from "@/components/InfoCard";
import { getJobBySlug } from "@/lib/jobs";
import { formatPostedDate } from "@/util/formatPostedDate";
import { notFound } from "next/navigation";

interface JobDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  return (
    <GlobalLayout>
      <Header title="Preview" />
      <div className="border-y flex flex-col pb-4 pt-4 md:pt-12 md:gap-1 relative">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
          {job.title}
        </h1>
        <p className="text-md md:text-lg text-zinc-600">{job.location}</p>
        <p className="text-md md:text-lg text-zinc-600">
          {formatPostedDate(job.postedDate)}
        </p>
        <button className="border w-56 py-4 rounded-md bg-black text-white font-semibold mt-4 md:mt-0 md:absolute cursor-pointer right-0 bottom-1/2 transform md:translate-y-1/2">
          Apply Now
        </button>
      </div>
      <div className="flex gap-4 w-full justify-between md:justify-start">
        <InfoCard label="Department" value={job.department} />
        <InfoCard label="Employee Type" value={job.type} />
        <InfoCard
          label="Offer Salary"
          value={`${job.salary.currency} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}/year`}
        />
      </div>
      <div className="description-section flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Description
        </h1>
        <p className="text-md md:text-lg text-justify md:left-aligned">
          {job.description}
        </p>
      </div>
      <div className="description-section flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Requirements
        </h1>

        <ul className="text-md md:text-lg list-disc list-outside md:space-y-1 pl-6">
          {job.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </div>
    </GlobalLayout>
  );
}
