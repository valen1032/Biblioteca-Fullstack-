import { useEffect, useState } from "react";
import { libroService } from "../services/libroService";
import type { Libro } from "../types";
import { Plus, BookOpen, Loader2, Search } from "lucide-react"; // <-- Agregado icono Search
import LibroModal from "../components/libros/LibroModal";
import LibroTable from "../components/libros/LibroTabla";

export default function LibrosPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [libroEditar, setLibroEditar] = useState<Libro | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // <-- Agregado para filtro ISBN / búsqueda
  const [formData, setFormData] = useState<Libro>({
    titulo: "",
    autor: "",
    isbn: "",
    edicion: "",
    fechaPublicacion: "",
  });

  const cargarLibros = async () => {
    setLoading(true);
    try {
      const res = await libroService.obtenerTodos();
      setLibros(res.data);
    } catch (error) {
      console.error("Error al cargar libros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // envolver la llamada en una función asíncrona
    const fetchData = async () => {
      await cargarLibros();
    };
    fetchData();
  }, []);

  const handleOpenModal = (libro?: Libro) => {
    if (libro) {
      setLibroEditar(libro);
      setFormData(libro);
    } else {
      setLibroEditar(null);
      setFormData({ titulo: "", autor: "", isbn: "", edicion: "", fechaPublicacion: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLibroEditar(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (libroEditar && libroEditar.id) {
        await libroService.actualizar(libroEditar.id, formData);
      } else {
        await libroService.crear(formData);
      }
      cargarLibros();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar libro:", error);
    }
  };

  const handleEliminar = async (id: number) => {
    if (confirm("¿Eliminar este libro?")) {
      await libroService.eliminar(id);
      cargarLibros();
    }
  };

  // <-- Agregado: Filtrado por ISBN o Titulo sin alterar el estado original
  const librosFiltrados = libros.filter(
    (l) =>
      l.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Libros</h1>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Nuevo Libro
        </button>
      </div>

      {/* <-- Agregado: Buscador por ISBN requerido por el documento --> */}
      <div className="relative max-w-md">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar ejemplares por ISBN o título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-slate-700 bg-white shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12 text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-green-600" /> Cargando libros...
        </div>
      ) : (
        <LibroTable libros={librosFiltrados} onEdit={handleOpenModal} onDelete={handleEliminar} />
      )}

      {isModalOpen && (
        <LibroModal
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}