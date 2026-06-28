package com.pizzaria.didiopizza.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.pizzaria.didiopizza.security.JwtUtil;
import com.pizzaria.didiopizza.service.LojaService;

@RestController
public class LojaController {
    private final LojaService service;
    private final JwtUtil jwt;

    public LojaController(LojaService s, JwtUtil j) {
        service = s;
        jwt = j;
    }

    @GetMapping("/loja/status")
    public Map<String, Object> status() {
        return service.verificarStatusLoja();
    }

    @PutMapping("/admin/loja/abrir")
    public Map<String, String> abrir(
            @RequestHeader("Authorization") String a) {
        jwt.onlyAdmin(a);
        service.abrirLoja();
        return Map.of("msg", "Loja aberta com sucesso");
    }

    @PutMapping("/admin/loja/fechar")
    public Map<String, String> fechar(
            @RequestHeader("Authorization") String a) {
        jwt.onlyAdmin(a);
        service.fecharLoja();
        return Map.of("msg", "Loja fechada com sucesso");
    }
}
