package com.pizzaria.didiopizza.controllers;

import com.pizzaria.didiopizza.service.CategoriaService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class CategoriaController {
    private final CategoriaService service;

    public CategoriaController(CategoriaService s) {
        service = s;
    }

    @GetMapping("/categoria")
    public List<Map<String, Object>> listar() {
        return service.listarCategorias();
    }
}
