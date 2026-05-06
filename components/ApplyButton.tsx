"use client";

import Button from "./Button";
import { sendGTMEvent } from "@next/third-parties/google";
import type { Job } from "@/types/job";

interface ApplyButtonProps {
  job: Job;
}

export default function ApplyButton({ job }: ApplyButtonProps) {
  const handleApplyClick = () => {
    sendGTMEvent({
      event: "apply_now_click",
      job_title: job.title,
      job_slug: job.slug,
      department: job.department,
      employment_type: job.type,
    });

    console.log("Apply Now Clicked!");
  };

  return (
    <Button
      text="Apply Now"
      className="mt-4 md:mt-0 md:absolute md:right-0 md:bottom-1/2 md:translate-y-1/2"
      onClick={handleApplyClick}
    />
  );
}
