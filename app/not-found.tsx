import type { Metadata } from "next";
import GlobalLayout from "@/components/GlobalLayout";
import Link from "next/link";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: {
    absolute: "Page Not Found",
  },
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PageNotFound() {
  return (
    <GlobalLayout>
      <div className="flex min-h-[60vh] items-center justify-center text-center">
        <div>
          <h1 className="text-5xl font-semibold tracking-tight text-black">
            404
          </h1>
          <h2 className="text-3xl font-semibold tracking-tight text-black mt-2">
            Page not found
          </h2>
          <p className="text-md text-zinc-600 mt-2">
            This page may have been removed or the job is no longer available.
          </p>

          <Link href="/">
            <Button text="Go back home" className="mt-4" />
          </Link>
        </div>
      </div>
    </GlobalLayout>
  );
}
