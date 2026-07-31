import { useEffect, useState } from "react";
import { prestamoService } from "../services/prestamoService";
import type { Prestamo } from "../types";
import { Plus, ClipboardList, Loader2 } from "lucide-react";
import PrestamoModal from "../components/prestamos/PrestamoModal";
import PrestamoTable from "../components/prestamos/PrestamoTabla";

export default function PrestamosPage() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prestamoEditar, setPrestamoEditar] = useState<Prestamo | null>(null);
  const [formData, setFormData] = useState<Prestamo>({
    usuarioId: 0,
    libroId: 0,
    fechaPrestamo: "",
    fechaDevolucion: "",
  });

  const cargarPrestamos = async () => {
    setLoading(true);
    try {
      const res = await prestamoService.obtenerTodos();
      setPrestamos(res.data);
    } catch (error) {
      console.error("Error al cargar préstamos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await cargarPrestamos();
    };
    fetchData();
  }, []);

  const handleOpenModal = (prestamo?: Prestamo) => {
    if (prestamo) {
      setPrestamoEditar(prestamo);
      setFormData(prestamo);
    } else {
      setPrestamoEditar(null);
      setFormData({ usuarioId: 0, libroId: 0, fechaPrestamo: "", fechaDevolucion: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPrestamoEditar(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (prestamoEditar && prestamoEditar.id) {
        await prestamoService.actualizar(prestamoEditar.id, formData);
      } else {
        await prestamoService.crear(formData);
      }
      cargarPrestamos();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar préstamo:", error);
    }
  };

  const handleEliminar = async (id: number) => {
    if (confirm("¿Eliminar este préstamo?")) {
      await prestamoService.eliminar(id);
      cargarPrestamos();
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
            <ClipboardList className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Préstamos</h1>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Nuevo Préstamo
        </button>
      </div>

      {/* Loader o Tabla */}
      {loading ? (
        <div className="flex justify-center items-center py-12 text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-purple-600" /> Cargando préstamos...
        </div>
      ) : (
        <PrestamoTable
          prestamos={prestamos}
          onEdit={handleOpenModal}
          onDelete={handleEliminar}
        />
      )}

      {/* Modal */}
      {isModalOpen && (
        <PrestamoModal
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
