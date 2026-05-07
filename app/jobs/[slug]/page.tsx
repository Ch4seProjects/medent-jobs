import GlobalLayout from "@/components/GlobalLayout";
import Header from "@/components/Header";
import { InfoCard } from "@/components/InfoCard";
import { getJobs, getJobBySlug } from "@/lib/jobs";
import { formatPostedDate, formatClosingDate } from "@/util/formatDate";
import { notFound } from "next/navigation";
import { mapEmploymentType } from "@/util/mapEmploymentType";
import ApplyButton from "@/components/ApplyButton";

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://medent-jobs.vercel.app";

  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: {
        absolute: "Job not found",
      },
      description:
        "This listing may have been removed or the link is incorrect.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: {
      absolute: job?.title,
    },
    description: job?.description,
    alternates: {
      canonical: `${baseUrl}/jobs/${slug}`,
    },
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://medent-jobs.vercel.app";
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job?.title,
    description: job?.description,
    datePosted: job?.postedDate,
    ...(job?.closingDate && {
      validThrough: job?.closingDate,
    }),
    hiringOrganization: {
      "@type": "Organization",
      name: "Medenterprises",
      sameAs: baseUrl,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job?.location,
        addressCountry: "NZ",
      },
    },
    employmentType: mapEmploymentType(job?.type ?? "Full-time"),
    ...(job?.salary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "NZD",
        value: {
          "@type": "QuantitativeValue",
          minValue: job?.salary.min,
          maxValue: job?.salary.max,
          unitText: "YEAR",
        },
      },
    }),
    url: `${baseUrl}/jobs/${job?.slug}`,
    industry: job?.department,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Jobs",
          item: `${baseUrl}/jobs`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: job?.title,
          item: `${baseUrl}/jobs/${job?.slug}`,
        },
      ],
    },
  };

  if (!job) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <GlobalLayout>
        <Header title="Preview" />
        <div className="border-y flex flex-col pb-4 pt-4 md:pt-12 md:gap-1 relative">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
            {job.title}
          </h1>
          <p className="text-md md:text-lg text-zinc-600">{job.location}</p>
          <p className="text-md md:text-lg text-zinc-600">
            {`Posted ${formatPostedDate(job.postedDate)} ago • ${formatClosingDate(job.closingDate)}`}
          </p>
          <ApplyButton job={job} />
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
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Description
          </h2>
          <p className="text-md md:text-lg text-justify md:left-aligned">
            {job.description}
          </p>
        </div>
        <div className="description-section flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-black">
            Requirements
          </h2>

          <ul className="text-md md:text-lg list-disc list-outside md:space-y-1 pl-6">
            {job.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
      </GlobalLayout>
    </>
  );
}
