package com.pizzaria.didiopizza.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.pizzaria.didiopizza.repository.CategoriaRepository;

@Service
public class CategoriaService {
    private final CategoriaRepository repo;

    public CategoriaService(CategoriaRepository repo) {
        this.repo = repo;
    }

    public List<Map<String, Object>> listarCategorias() {
        return repo.listarCategorias();
    }
}
