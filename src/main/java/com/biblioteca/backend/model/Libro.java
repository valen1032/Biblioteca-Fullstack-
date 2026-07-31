package com.biblioteca.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   
    private Long id;
    private String titulo;
    private String isbn;
    private String edicion;
    private LocalDate fechaPublicacion;
    private String autor;

    @OneToMany(mappedBy = "libro")
    @JsonIgnoreProperties("libro")
    private List<Prestamo> prestamos;


}
