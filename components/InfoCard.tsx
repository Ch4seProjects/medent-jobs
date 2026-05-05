type InfoCardProps = {
  label: string;
  value: React.ReactNode;
};

export function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="bg-zinc-300 flex flex-col gap-2 rounded-md p-3 md:p-4 flex-1 max-w-fit">
      <p className="text-xs md:text-lg text-zinc-600">{label}</p>
      <p className="text-xs md:text-lg text-zinc-600 font-semibold">{value}</p>
    </div>
  );
}
