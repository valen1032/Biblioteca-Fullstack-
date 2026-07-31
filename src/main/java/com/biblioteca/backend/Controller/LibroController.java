package com.biblioteca.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.biblioteca.backend.model.Libro;
import com.biblioteca.backend.repository.LibroRepository;
import com.biblioteca.backend.repository.PrestamoRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map; 
import java.util.Optional;

@RestController
@RequestMapping("/libros")
@CrossOrigin(origins = "http://localhost:5173")
public class LibroController {

    private final LibroRepository libroRepository;
    private final PrestamoRepository prestamoRepository; // <-- 2. Atributo declarado

    //inyeccion de repositorios
    public LibroController(LibroRepository libroRepository, PrestamoRepository prestamoRepository){
        this.libroRepository = libroRepository;
        this.prestamoRepository = prestamoRepository;
    }

    // Listar todos los libros
    @GetMapping
    public List<Libro> obtenerLibros(){
        return libroRepository.findAll();
    }

    // Buscar libro por ID
    @GetMapping("/{id}")
    public Optional<Libro> obtenerLibroPorId(@PathVariable Long id){
        return libroRepository.findById(id);
        
    }

    @GetMapping("/isbn/{isbn}")
    public ResponseEntity<Libro> obtenerPorIsbn(@PathVariable String isbn) {
       Optional<Libro> libroOpt = libroRepository.findByIsbn(isbn);

    if (libroOpt.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(libroOpt.get());
}
        


    @GetMapping("/disponibilidad/{isbn}")
    public ResponseEntity<Map<String, Object>> verificarDisponibilidad(@PathVariable String isbn) {
        Optional<Libro> libroOpt = libroRepository.findByIsbn(isbn);

        if (libroOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Libro libro = libroOpt.get();
        
        
        boolean estadoPrestado = prestamoRepository
                .existsByLibroIdAndEstadoPrestamo(libro.getId(), "ACTIVO");

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("isbn", isbn);
        respuesta.put("titulo", libro.getTitulo());
        respuesta.put("disponible", !estadoPrestado); 

        return ResponseEntity.ok(respuesta);
    }

    // Insertar un nuevo libro
    @PostMapping
    public Libro crearLibro(@RequestBody Libro libro){
        return libroRepository.save(libro);   
    }

    // Actualizar un libro existente 
    @PutMapping("/{id}")
    public Libro actualizarLibro(@PathVariable Long id, @RequestBody Libro libroActualizado) {
        return libroRepository.findById(id)
            .map(libro -> {
                libro.setTitulo(libroActualizado.getTitulo());
                libro.setAutor(libroActualizado.getAutor());
                libro.setIsbn(libroActualizado.getIsbn());
                libro.setEdicion(libroActualizado.getEdicion());
                libro.setFechaPublicacion(libroActualizado.getFechaPublicacion());
                return libroRepository.save(libro);
            })
            .orElseThrow(() -> new RuntimeException("Libro no encontrado con id " + id));
    }

    // Eliminar un libro por ID
    @DeleteMapping("/{id}")
    public void eliminarLibro(@PathVariable Long id){
        libroRepository.deleteById(id);
    }
}