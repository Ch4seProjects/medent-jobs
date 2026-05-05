interface headerProps {
  title: string;
  subTitle: string;
}

export default function Header({ title, subTitle }: headerProps) {
  return (
    <div className="flex flex-col shrink-0">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        {title}
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">{subTitle}</p>
    </div>
  );
}
