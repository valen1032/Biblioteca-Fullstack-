import type { Prestamo } from "../../types";

interface PrestamoModalProps {
  formData: Prestamo;
  setFormData: React.Dispatch<React.SetStateAction<Prestamo>>;
  handleSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function PrestamoModal({ formData, setFormData, handleSubmit, onClose }: PrestamoModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">
          {formData.id ? "Editar Préstamo" : "Nuevo Préstamo"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="number" placeholder="ID Usuario" value={formData.usuarioId} onChange={(e) => setFormData({ ...formData, usuarioId: Number(e.target.value) })} required className="w-full border rounded px-3 py-2" />
          <input type="number" placeholder="ID Libro" value={formData.libroId} onChange={(e) => setFormData({ ...formData, libroId: Number(e.target.value) })} required className="w-full border rounded px-3 py-2" />
          <input type="date" value={formData.fechaPrestamo} onChange={(e) => setFormData({ ...formData, fechaPrestamo: e.target.value })} required className="w-full border rounded px-3 py-2" />
          <input type="date" value={formData.fechaDevolucion} onChange={(e) => setFormData({ ...formData, fechaDevolucion: e.target.value })} required className="w-full border rounded px-3 py-2" />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
