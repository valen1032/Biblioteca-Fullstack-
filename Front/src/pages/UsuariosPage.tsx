import { useEffect, useState } from "react";
import { usuarioService } from "../services/usuarioService";
import type { Usuario } from "../types";
import { Plus, Users, Loader2 } from "lucide-react";
import UsuarioModal from "../components/usuarios/UsuarioModal";
import UsuarioTable from "../components/usuarios/UsuarioTabla";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<Usuario>({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
  });

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const res = await usuarioService.obtenerTodos();
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await cargarUsuarios();
    };
    fetchData();
  }, []);

  const handleOpenModal = (usuario?: Usuario) => {
    if (usuario) {
      setUsuarioEditar(usuario);
      setFormData(usuario);
    } else {
      setUsuarioEditar(null);
      setFormData({ nombre: "", apellido: "", email: "", fechaNacimiento: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUsuarioEditar(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (usuarioEditar && usuarioEditar.id) {
        await usuarioService.actualizar(usuarioEditar.id, formData);
      } else {
        await usuarioService.crear(formData);
      }
      cargarUsuarios();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleEliminar = async (id: number) => {
    if (confirm("¿Eliminar este usuario?")) {
      await usuarioService.eliminar(id);
      cargarUsuarios();
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestión de Usuarios</h1>
            <p className="text-sm text-slate-500">Administra los lectores registrados</p>
          </div>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Nuevo Usuario
        </button>
      </div>

      {/* Tabla */}
      {loading ? (
        <div className="flex justify-center items-center py-12 text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" /> Cargando usuarios...
        </div>
      ) : (
        <UsuarioTable
          usuarios={usuarios}
          onEdit={handleOpenModal}
          onDelete={handleEliminar}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <UsuarioModal
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
