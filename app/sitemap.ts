import type { MetadataRoute } from "next";
import { getJobs } from "@/lib/jobs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  try {
    const jobFeed = await getJobs();

    const jobPages: MetadataRoute.Sitemap = jobFeed.map((job) => ({
      url: `${baseUrl}/jobs/${job.slug}`,
      lastModified: new Date(job.postedDate),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [...staticPages, ...jobPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
