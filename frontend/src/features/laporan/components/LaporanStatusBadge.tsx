import { Badge } from "@/components/ui/badge";

export function LaporanStatusBadge({ status }: { status?: string }) {
  const styles: Record<string, string> = {
    menunggu: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
    diproses: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200",
    selesai: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200",
    ditolak: "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200",
  };

  const safeStatus = status || 'menunggu';
  const currentStyle = styles[safeStatus] || styles.menunggu;

  return (
    <Badge variant="outline" className={`${currentStyle} border px-3 py-0.5 text-xs font-semibold uppercase`}>
      {safeStatus}
    </Badge>
  );
}