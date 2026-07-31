package com.biblioteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.biblioteca.backend.Service.PrestamoService;
import com.biblioteca.backend.model.Prestamo;

import java.util.List;

public interface PrestamoRepository extends JpaRepository<Prestamo, Long>{

    // Para evitar duplicados por usuario y libro
    boolean existsByUsuarioIdAndLibroIdAndEstadoPrestamo(Long usuarioId, Long libroId, String estadoPrestamo);
    //Para verificar si el libro está disponible en general
    boolean existsByLibroIdAndEstadoPrestamo(Long libroId, String estadoPrestamo);

    List<Prestamo> findByUsuarioId(Long usuarioId);
    
    List<Prestamo> findByLibroId(Long libroId);
    
}
