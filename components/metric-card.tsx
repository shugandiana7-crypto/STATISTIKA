interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-xl">
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/10" />
      <div className="relative">
        {icon && <div className="mb-2 text-primary">{icon}</div>}
        <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
        <p className="text-4xl font-extrabold text-foreground">{value}</p>
      </div>
    </div>
  );
}
