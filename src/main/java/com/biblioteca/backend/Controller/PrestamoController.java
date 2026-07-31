package com.biblioteca.backend.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.backend.Service.PrestamoService;
import com.biblioteca.backend.model.Libro;
import com.biblioteca.backend.model.Prestamo;
import com.biblioteca.backend.model.Usuario;
import com.biblioteca.backend.repository.LibroRepository;
import com.biblioteca.backend.repository.PrestamoRepository;
import com.biblioteca.backend.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/prestamos")
public class PrestamoController {

    private final PrestamoRepository prestamoRepository;
    private final UsuarioRepository usuarioRepository;
    private final LibroRepository libroRepository;
    private final PrestamoService prestamoService;

    // Inyectamos repositorios y el servicio
    public PrestamoController(
            PrestamoRepository prestamoRepository,
            UsuarioRepository usuarioRepository,
            LibroRepository libroRepository,
            PrestamoService prestamoService) {
        this.prestamoRepository = prestamoRepository;
        this.usuarioRepository = usuarioRepository;
        this.libroRepository = libroRepository;
        this.prestamoService = prestamoService;
    }

    @GetMapping
    public List<Prestamo> listarPrestamos() {
        // Actualizamos los estados antes de listar por si se venció algún préstamo
        prestamoService.actualizarEstadoPrestamos();
        return prestamoRepository.findAll();
    }

    @GetMapping("/{id}")
public ResponseEntity<Prestamo> obtenerPrestamoPorId(@PathVariable Long id) {
    return prestamoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}

    // Endpoint requerido: Listar préstamos por Usuario
    @GetMapping("/usuario/{usuarioId}")
    public List<Prestamo> listarPrestamosPorUsuario(@PathVariable Long usuarioId) {
        return prestamoRepository.findByUsuarioId(usuarioId);
    }

    // Endpoint requerido: Listar préstamos por Libro
    @GetMapping("/libro/{libroId}")
    public List<Prestamo> listarPrestamosPorLibro(@PathVariable Long libroId) {
        return prestamoRepository.findByLibroId(libroId);
    }

    @PostMapping
    public ResponseEntity<?> crearPrestamo(@RequestBody Prestamo prestamo) {
        try {
            // Pasamos la creación por la lógica de negocio del servicio
            Prestamo nuevoPrestamo = prestamoService.registrarPrestamo(
                    prestamo.getUsuario().getId(),
                    prestamo.getLibro().getId(),
                    prestamo.getFechaDevolucion()
            );
            return new ResponseEntity<>(nuevoPrestamo, HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            // Retorna un error 400 en caso de que ya tenga un préstamo activo
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public Prestamo actualizarPrestamo(@PathVariable Long id, @RequestBody Prestamo prestamoActualizado) {
        return prestamoRepository.findById(id)
            .map(prestamo -> {
                prestamo.setFechaPrestamo(prestamoActualizado.getFechaPrestamo());
                prestamo.setFechaDevolucion(prestamoActualizado.getFechaDevolucion());

                if (prestamoActualizado.getUsuario() != null) {
                    Usuario usuario = usuarioRepository.findById(prestamoActualizado.getUsuario().getId())
                            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
                    prestamo.setUsuario(usuario);
                }

                if (prestamoActualizado.getLibro() != null) {
                    Libro libro = libroRepository.findById(prestamoActualizado.getLibro().getId())
                            .orElseThrow(() -> new RuntimeException("Libro no encontrado"));
                    prestamo.setLibro(libro);
                }

                if (prestamoActualizado.getEstadoPrestamo() != null) {
                    prestamo.setEstadoPrestamo(prestamoActualizado.getEstadoPrestamo());
                }
                
                return prestamoRepository.save(prestamo);
            })
            .orElseThrow(() -> new RuntimeException("Préstamo no encontrado con id " + id));
    }

    @PutMapping("/{id}/devolver")
public ResponseEntity<?> devolverPrestamo(@PathVariable Long id) {
    try {
        Prestamo prestamoDevuelto = prestamoService.devolverPrestamo(id);
        return ResponseEntity.ok(prestamoDevuelto);
    } catch (IllegalStateException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}

    @DeleteMapping("/{id}")
    public void eliminarPrestamo(@PathVariable Long id) {
        prestamoRepository.deleteById(id);
    }
}