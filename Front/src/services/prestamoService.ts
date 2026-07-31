import API from "../api/axios";
import type { Prestamo } from "../types";

export const prestamoService = {
  obtenerTodos: () => API.get<Prestamo[]>("/prestamos"),
  crear: (prestamo: Omit<Prestamo, "id">) => API.post("/prestamos", prestamo),
  actualizar: (id: number, prestamo: Prestamo) => API.put(`/prestamos/${id}`, prestamo),
  eliminar: (id: number) => API.delete(`/prestamos/${id}`),
};

