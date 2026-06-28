package com.pizzaria.didiopizza.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pizzaria.didiopizza.security.JwtUtil;
import com.pizzaria.didiopizza.service.ClienteService;

@RestController
public class ClienteController {
    private final ClienteService service;
    private final JwtUtil jwt;

    public ClienteController(ClienteService service, JwtUtil jwt) {
        this.service = service;
        this.jwt = jwt;
    }

    @PostMapping("/cliente")
    public ResponseEntity<?> criar(
            @RequestBody Map<String, Object> b) {
        return ResponseEntity.status(201).body(Map.of("id", service.criarCliente(b)));
    }

    @PostMapping("/cliente/login")
    public Map<String, Object> login(
            @RequestBody Map<String, Object> b) {
        return Map.of("token", service.loginCliente(b));
    }

    @GetMapping("/cliente/me")
    public Map<String, Object> me(
            @RequestHeader("Authorization") String auth) {
        return service.buscarPerfil(jwt.getId(auth));
    }

    @PutMapping("/cliente/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar(
            @RequestHeader("Authorization") String auth,
            @RequestBody Map<String, Object> b) {
        service.atualizarPerfil(jwt.getId(auth), (String) b.get("nome"), (String) b.get("email"),
                (String) b.get("telefone"));
    }
}
