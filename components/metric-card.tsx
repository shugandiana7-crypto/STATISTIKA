interface MetricCardProps {
  title: string;
  value: string | number;
}

export function MetricCard({ title, value }: MetricCardProps) {
  return (
    <div className="relative overflow-hidden p-7 rounded-3xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/5 shadow-xl">
      <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-blue-500/15" />
      <h3 className="text-sm text-gray-400 mb-3 relative">{title}</h3>
      <p className="text-4xl font-extrabold relative">{value}</p>
    </div>
  );
}
