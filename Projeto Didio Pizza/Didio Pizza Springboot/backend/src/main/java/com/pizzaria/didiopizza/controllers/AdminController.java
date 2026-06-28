package com.pizzaria.didiopizza.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pizzaria.didiopizza.service.AdminService;

@RestController
public class AdminController {
    private final AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @PostMapping("/admin")
    public ResponseEntity<?> criar(
            @RequestBody Map<String, Object> body) {
        return ResponseEntity.status(201).body(Map.of("id", service.criarAdmin(body)));
    }

    @PostMapping("/admin/login")
    public Map<String, Object> login(
            @RequestBody Map<String, Object> body) {
        return Map.of(
                "token", service.loginAdmin(body),
                "tipo", "admin",
                "nome", "Admin"
        );
    }
}
