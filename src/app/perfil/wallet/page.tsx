import { Wallet } from "lucide-react";
import { walletBalance, walletTransactions } from "@/lib/bookings";

const statusStyles: Record<string, string> = {
  pending: "bg-tag-gray text-white/80",
  reversed: "bg-brand-secondary text-black",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  reversed: "Reversado",
};

export default function WalletPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="flex items-center gap-2.5 text-xl font-semibold">
          <Wallet className="text-brand-secondary size-5" />
          Wallet
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Encuentra tu saldo a favor para gastar en reservas.
        </p>
      </div>

      {/* Balance summary */}
      <div className="bg-surface-dark rounded-xl px-6 py-6 grid lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-white/50">Listo para usar</span>
          <span className="text-2xl font-semibold text-brand-primary">
            ${walletBalance.ready.toLocaleString("es-CL")}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-white/50">Monto total</span>
          <span className="text-2xl font-semibold text-brand-secondary">
            ${walletBalance.total.toLocaleString("es-CL")}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-white/50">Pendiente</span>
          <span className="text-2xl font-semibold text-brand-primary">
            ${walletBalance.pending.toLocaleString("es-CL")}
          </span>
        </div>
      </div>

      {/* Transactions table */}
      <div className="bg-surface-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dark-muted/40">
                <th className="text-left px-5 py-4 text-white/40 font-medium">
                  Clase
                </th>
                <th className="text-left px-5 py-4 text-white/40 font-medium">
                  Fecha reserva
                </th>
                <th className="text-left px-5 py-4 text-white/40 font-medium">
                  Monto
                </th>
                <th className="text-left px-5 py-4 text-white/40 font-medium">
                  Fecha devolución
                </th>
                <th className="text-left px-5 py-4 text-white/40 font-medium">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {walletTransactions.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className={
                    idx < walletTransactions.length - 1
                      ? "border-b border-dark-muted/20"
                      : ""
                  }
                >
                  <td className="px-5 py-4 text-white/90">{tx.className}</td>
                  <td className="px-5 py-4 text-white/70">{tx.bookingDate}</td>
                  <td className="px-5 py-4 text-white/90">
                    ${tx.amount.toLocaleString("es-CL")}
                  </td>
                  <td className="px-5 py-4 text-white/70">{tx.returnDate}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[tx.status]}`}
                    >
                      {statusLabels[tx.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
