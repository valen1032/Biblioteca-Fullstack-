import type { Usuario } from "../../types";
import { Edit2, Trash2 } from "lucide-react";

interface UsuarioTableProps {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: number) => void;
}

export default function UsuarioTable({ usuarios, onEdit, onDelete }: UsuarioTableProps) {
  if (usuarios.length === 0) {
    return <div className="text-center py-12 text-slate-500">No hay usuarios registrados.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
            <th className="p-4">ID</th>
            <th className="p-4">Nombre Completo</th>
            <th className="p-4">Email</th>
            <th className="p-4">Fecha Nacimiento</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {usuarios.map((u) => (
            <tr key={u.id} className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-mono text-slate-400">#{u.id}</td>
              <td className="p-4 font-semibold text-slate-800">
                {u.nombre} {u.apellido}
              </td>
              <td className="p-4">{u.email}</td>
              <td className="p-4">{u.fechaNacimiento}</td>
              <td className="p-4 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(u)}
                  className="p-2 hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => u.id && onDelete(u.id)}
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
