package com.biblioteca.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.biblioteca.backend.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{}
