import type { Prestamo } from "../../types";
import { Edit2, Trash2 } from "lucide-react";

interface PrestamoTableProps {
  prestamos: Prestamo[];
  onEdit: (prestamo: Prestamo) => void;
  onDelete: (id: number) => void;
}

export default function PrestamoTable({ prestamos, onEdit, onDelete }: PrestamoTableProps) {
  if (prestamos.length === 0) {
    return <div className="text-center py-12 text-slate-500">No hay préstamos registrados.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
            <th className="p-4">ID</th>
            <th className="p-4">Usuario</th>
            <th className="p-4">Libro</th>
            <th className="p-4">Fecha Préstamo</th>
            <th className="p-4">Fecha Devolución</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {prestamos.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-mono text-slate-400">#{p.id}</td>
              <td className="p-4">{p.usuarioId}</td>
              <td className="p-4">{p.libroId}</td>
              <td className="p-4">{p.fechaPrestamo}</td>
              <td className="p-4">{p.fechaDevolucion}</td>
              <td className="p-4 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="p-2 hover:bg-slate-100 text-slate-600 hover:text-purple-600 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => p.id && onDelete(p.id)}
                  className="p-2 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
