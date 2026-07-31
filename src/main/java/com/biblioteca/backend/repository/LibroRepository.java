package com.biblioteca.backend.repository;
import com.biblioteca.backend.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LibroRepository extends JpaRepository<Libro, Long>{
    Optional<Libro> findByIsbn(String isbn);
    
}
