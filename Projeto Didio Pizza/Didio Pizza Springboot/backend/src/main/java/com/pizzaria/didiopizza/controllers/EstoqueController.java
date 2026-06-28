package com.pizzaria.didiopizza.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pizzaria.didiopizza.security.JwtUtil;
import com.pizzaria.didiopizza.service.EstoqueService;

@RestController
public class EstoqueController {
    private final EstoqueService service;
    private final JwtUtil jwt;

    public EstoqueController(EstoqueService s, JwtUtil j) {
        service = s;
        jwt = j;
    }

    @PostMapping({"/estoque", "/ingrediente"})
    public ResponseEntity<?> criar(
            @RequestHeader("Authorization") String a,
            @RequestBody Map<String, Object> b) {
        jwt.onlyAdmin(a);
        return ResponseEntity.status(201).body(Map.of("id", service.criar(b)));
    }

    @GetMapping({"/estoque", "/ingrediente"})
    public List<Map<String, Object>> listar(
            @RequestHeader("Authorization") String a) {
        jwt.onlyAdmin(a);
        return service.listar();
    }

    @PutMapping({"/estoque/{id}", "/ingrediente/{id}"})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atu(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id,
            @RequestBody Map<String, Object> b) {
        jwt.onlyAdmin(a);
        service.atualizar(id, b);
    }

    @DeleteMapping({"/estoque/{id}", "/ingrediente/{id}"})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void del(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id) {
        jwt.onlyAdmin(a);
        service.remover(id);
    }
}
