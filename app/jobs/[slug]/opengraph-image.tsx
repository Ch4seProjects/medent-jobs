import { ImageResponse } from "next/og";
import { getJobBySlug } from "@/lib/jobs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  const salaryRange = job
    ? `${job.salary.currency} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}/year`
    : null;

  return new ImageResponse(
    <div
      style={{
        background: "#fafafa",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 72px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#000000",
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        Medent Jobs
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            color: "#000000",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {job?.title ?? "Job Not Found"}
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          {job?.location && (
            <div
              style={{
                background: "#d4d4d8",
                color: "#000000",
                fontSize: 26,
                padding: "8px 24px",
                borderRadius: 999,
              }}
            >
              📍 {job.location}
            </div>
          )}
          {job?.type && (
            <div
              style={{
                background: "#d4d4d8",
                color: "#000000",
                fontSize: 26,
                padding: "8px 24px",
                borderRadius: 999,
              }}
            >
              {job.type}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {salaryRange && (
          <div
            style={{
              color: "#000000",
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            {salaryRange}
          </div>
        )}
        {job?.department && (
          <div
            style={{
              color: "#000000",
              fontSize: 24,
            }}
          >
            {job.department}
          </div>
        )}
      </div>
    </div>,
    { ...size },
  );
}
