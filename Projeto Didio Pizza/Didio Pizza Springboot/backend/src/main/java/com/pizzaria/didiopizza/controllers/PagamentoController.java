package com.pizzaria.didiopizza.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.pizzaria.didiopizza.security.JwtUtil;
import com.pizzaria.didiopizza.service.PagamentoService;

@RestController
public class PagamentoController {
    private final PagamentoService service;
    private final JwtUtil jwt;

    public PagamentoController(PagamentoService s, JwtUtil j) {
        service = s;
        jwt = j;
    }

    @PostMapping("/pagamento")
    public ResponseEntity<?> pagar(
            @RequestHeader("Authorization") String a,
            @RequestBody Map<String, Object> b) {
        Object p = b.get("pedido_id");
        String tipo = (String) b.get("tipo");
        return ResponseEntity.status(201).body(Map.of("id",
                service.realizarPagamento(jwt.getId(a), p == null ? null : Integer.parseInt(String.valueOf(p)), tipo)));
    }
}
