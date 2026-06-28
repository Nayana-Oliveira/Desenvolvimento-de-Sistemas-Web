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
import com.pizzaria.didiopizza.service.EnderecoService;

@RestController
public class EnderecoController {
    private final EnderecoService service;
    private final JwtUtil jwt;

    public EnderecoController(EnderecoService s, JwtUtil j) {
        service = s;
        jwt = j;
    }

    @PostMapping("/endereco")
    public ResponseEntity<?> add(
            @RequestHeader("Authorization") String a,
            @RequestBody Map<String, Object> b) {
        return ResponseEntity.status(201).body(Map.of("id", service.adicionarEndereco(jwt.getId(a), b)));
    }

    @GetMapping("/endereco")
    public List<Map<String, Object>> listar(
            @RequestHeader("Authorization") String a) {
        return service.listarEnderecos(jwt.getId(a));
    }

    @GetMapping("/endereco/{id}")
    public Map<String, Object> buscar(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id) {
        return service.buscarEndereco(jwt.getId(a), id);
    }

    @PutMapping("/endereco/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id,
            @RequestBody Map<String, Object> b) {
        service.atualizarEndereco(jwt.getId(a), id, b);
    }

    @DeleteMapping("/endereco/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void del(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id) {
        service.removerEndereco(jwt.getId(a), id);
    }
}
