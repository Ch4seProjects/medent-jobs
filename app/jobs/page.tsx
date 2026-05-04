export default function JobPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between p-8 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Job Listing Page
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This is where you can see all the jobs that are available.
          </p>
        </div>
      </main>
    </div>
  );
}
