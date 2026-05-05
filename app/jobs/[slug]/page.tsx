import GlobalLayout from "@/components/GlobalLayout";
import Header from "@/components/Header";
import { getJobBySlug } from "@/lib/jobs";
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
      <Header
        title={`Job Detail Page: ${job.title}`}
        subTitle="This is where you can see a detailed view of a job."
      />
    </GlobalLayout>
  );
}
