import GlobalLayout from "@/components/GlobalLayout";
import Header from "@/components/Header";

export default function JobNotFound() {
  return (
    <GlobalLayout>
      <Header
        title="Job not found"
        subTitle="This listing may have been removed or the link is incorrect."
      />
    </GlobalLayout>
  );
}
