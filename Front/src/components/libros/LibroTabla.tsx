import type { Libro } from "../../types";
import { Edit2, Trash2 } from "lucide-react";

interface LibroTableProps {
  libros: Libro[];
  onEdit: (libro: Libro) => void;
  onDelete: (id: number) => void;
}

export default function LibroTable({ libros, onEdit, onDelete }: LibroTableProps) {
  if (libros.length === 0) {
    return <div className="text-center py-12 text-slate-500">No hay libros registrados.</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
            <th className="p-4">ID</th>
            <th className="p-4">Título</th>
            <th className="p-4">Autor</th>
            <th className="p-4">ISBN</th>
            <th className="p-4">Edición</th> {/* <-- Agregada cabecera Edición */}
            <th className="p-4">Fecha Publicación</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
          {libros.map((l) => (
            <tr key={l.id} className="hover:bg-slate-50 transition-colors">
              <td className="p-4 font-mono text-slate-400">#{l.id}</td>
              <td className="p-4 font-semibold text-slate-800">{l.titulo}</td>
              <td className="p-4">{l.autor}</td>
              <td className="p-4">{l.isbn}</td>
              <td className="p-4">{l.edicion}</td> {/* <-- Agregada celda Edición */}
              <td className="p-4">{l.fechaPublicacion}</td>
              <td className="p-4 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(l)}
                  className="p-2 hover:bg-slate-100 text-slate-600 hover:text-green-600 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => l.id && onDelete(l.id)}
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