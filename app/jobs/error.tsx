"use client";

import GlobalLayout from "@/components/GlobalLayout";
import Header from "@/components/Header";

export default function JobsError({ error }: { error: Error }) {
  return (
    <GlobalLayout>
      <Header title="Something went wrong" subTitle={error.message} />
    </GlobalLayout>
  );
}
