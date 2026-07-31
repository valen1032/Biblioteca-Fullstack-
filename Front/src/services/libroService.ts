import API from "../api/axios";
import type { Libro } from "../types";

export const libroService = {
  obtenerTodos: () => API.get<Libro[]>("/libros"),
  crear: (libro: Omit<Libro, "id">) => API.post("/libros", libro),
  actualizar: (id: number, libro: Libro) => API.put(`/libros/${id}`, libro),
  eliminar: (id: number) => API.delete(`/libros/${id}`),
};
