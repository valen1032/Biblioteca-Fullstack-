package com.biblioteca.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Prestamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaPrestamo;
    private LocalDate fechaDevolucion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    @JsonIgnoreProperties("prestamos") 
    private Usuario usuario;

    private String estadoPrestamo; // ACTIVO, DEVUELTO, VENCIDO


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "libro_id")
    @JsonIgnoreProperties("prestamos")
    private Libro libro;
}

