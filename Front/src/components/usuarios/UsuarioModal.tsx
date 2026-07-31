import type { Usuario } from "../../types";

interface UsuarioModalProps {
  formData: Usuario;
  setFormData: React.Dispatch<React.SetStateAction<Usuario>>;
  handleSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function UsuarioModal({
  formData,
  setFormData,
  handleSubmit,
  onClose,
}: UsuarioModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">
          {formData.id ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
