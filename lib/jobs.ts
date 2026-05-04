import jobsData from "@/data/jobs.json";
import type { Job } from "@/types/job";

export async function getJobs(): Promise<Job[]> {
  if (process.env.DATA_SOURCE === "api") {
    const res = await fetch(`${process.env.JOBS_API_URL}/jobs`);

    if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`);

    return res.json();
  }

  return jobsData as Job[];
}

export async function getJobBySlug(slug: Job["slug"]): Promise<Job | null> {
  if (process.env.DATA_SOURCE === "api") {
    const res = await fetch(`${process.env.JOBS_API_URL}/jobs/${slug}`);

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch job ${slug}: ${res.status}`);

    return res.json();
  }

  return (jobsData.find((job) => job.slug === slug) as Job) ?? null;
}
