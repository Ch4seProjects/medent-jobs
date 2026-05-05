interface PillProps {
  text: string;
}

export default function Pill({ text }: PillProps) {
  return (
    <p className="flex justify-center items-center px-4 rounded-md text-sm bg-zinc-300 group-hover:bg-white transition-colors duration-200 ease-in-out">
      {text}
    </p>
  );
}
