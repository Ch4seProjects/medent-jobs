export default function JobNotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between p-8 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Job not found
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            This listing may have been removed or the link is incorrect.
          </p>
        </div>
      </main>
    </div>
  );
}
