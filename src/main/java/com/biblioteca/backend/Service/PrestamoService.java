package com.biblioteca.backend.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.biblioteca.backend.model.Libro;
import com.biblioteca.backend.model.Prestamo;
import com.biblioteca.backend.model.Usuario;
import com.biblioteca.backend.repository.LibroRepository;
import com.biblioteca.backend.repository.PrestamoRepository;
import com.biblioteca.backend.repository.UsuarioRepository;

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Prestamo registrarPrestamo(Long usuarioId, Long libroId, LocalDate fechaDevolucion) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Libro libro = libroRepository.findById(libroId)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));

        boolean existePrestamoActivo = prestamoRepository
                .existsByUsuarioIdAndLibroIdAndEstadoPrestamo(usuarioId, libroId, "ACTIVO");

        if (existePrestamoActivo) {
            throw new IllegalStateException("El usuario ya tiene un ejemplar activo de este libro");
        }

        Prestamo prestamo = new Prestamo();
        prestamo.setUsuario(usuario);
        prestamo.setLibro(libro);
        prestamo.setFechaPrestamo(LocalDate.now());
        prestamo.setFechaDevolucion(fechaDevolucion);
        prestamo.setEstadoPrestamo("ACTIVO");

        return prestamoRepository.save(prestamo);
    }

    public void actualizarEstadoPrestamos() {
        List<Prestamo> prestamos = prestamoRepository.findAll();
        LocalDate hoy = LocalDate.now();

        for (Prestamo p : prestamos) {
            // 1. Si el estado es null (registros antiguos), le asignamos "ACTIVO" por defecto
            if (p.getEstadoPrestamo() == null) {
                p.setEstadoPrestamo("ACTIVO");
            }

            // 2. Si la fecha de devolución ya pasó y no ha sido devuelto, pasa a VENCIDO
            if (p.getFechaDevolucion() != null 
                    && p.getFechaDevolucion().isBefore(hoy) 
                    && !"DEVUELTO".equalsIgnoreCase(p.getEstadoPrestamo())) {
                p.setEstadoPrestamo("VENCIDO");
            }

            // Guardamos el cambio
            prestamoRepository.save(p);
        }
    }

    public Prestamo devolverPrestamo(Long prestamoId) {
    Prestamo prestamo = prestamoRepository.findById(prestamoId)
            .orElseThrow(() -> new RuntimeException("Préstamo no encontrado con id " + prestamoId));

    if ("DEVUELTO".equalsIgnoreCase(prestamo.getEstadoPrestamo())) {
        throw new IllegalStateException("El préstamo ya fue devuelto anteriormente.");
    }

    prestamo.setEstadoPrestamo("DEVUELTO");

    return prestamoRepository.save(prestamo);
}
}