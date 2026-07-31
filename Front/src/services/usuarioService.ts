import API from "../api/axios";
import type { Usuario } from "../types";

export const usuarioService = {
  obtenerTodos: () => API.get<Usuario[]>("/usuarios"),
  crear: (usuario: Omit<Usuario, "id">) => API.post("/usuarios", usuario),
  actualizar: (id: number, usuario: Usuario) => API.put(`/usuarios/${id}`, usuario),
  eliminar: (id: number) => API.delete(`/usuarios/${id}`),
}
