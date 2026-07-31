export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
}


export interface Libro {
  id?: number;
  titulo: string;
  isbn: string; 
  edicion: string;
  fechaPublicacion: string;
  autor: string;
}


export interface Prestamo {
  id?: number;
  usuarioId: number;
  libroId: number;
  fechaPrestamo: string;
  fechaDevolucion: string;
}