import type { Libro } from "../../types";

interface LibroModalProps {
  formData: Libro;
  setFormData: React.Dispatch<React.SetStateAction<Libro>>;
  handleSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function LibroModal({ formData, setFormData, handleSubmit, onClose }: LibroModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">
          {formData.id ? "Editar Libro" : "Nuevo Libro"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Título" value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} required className="w-full border rounded px-3 py-2" />
          <input type="text" placeholder="Autor" value={formData.autor} onChange={(e) => setFormData({ ...formData, autor: e.target.value })} required className="w-full border rounded px-3 py-2" />
          <input type="text" placeholder="ISBN" value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} required pattern="\d{10}|\d{13}" title="Debe ser un ISBN válido (10 o 13 dígitos)" className="w-full border rounded px-3 py-2" />
          {/* <-- Agregado: Campo requerido Edición según el documento --> */}
          <input type="text" placeholder="Edición (ej. 1ra Edición)" value={formData.edicion} onChange={(e) => setFormData({ ...formData, edicion: e.target.value })} required className="w-full border rounded px-3 py-2" />
          <input type="date" value={formData.fechaPublicacion} onChange={(e) => setFormData({ ...formData, fechaPublicacion: e.target.value })} required className="w-full border rounded px-3 py-2" />
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
