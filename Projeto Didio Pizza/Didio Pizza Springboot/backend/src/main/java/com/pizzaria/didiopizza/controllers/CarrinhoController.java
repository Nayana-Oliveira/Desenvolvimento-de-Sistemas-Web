package com.pizzaria.didiopizza.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pizzaria.didiopizza.security.JwtUtil;
import com.pizzaria.didiopizza.service.CarrinhoService;

@RestController
public class CarrinhoController {
    private final CarrinhoService service;
    private final JwtUtil jwt;

    public CarrinhoController(CarrinhoService s, JwtUtil j) {
        service = s;
        jwt = j;
    }

    @PostMapping("/carrinho")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void add(
            @RequestHeader("Authorization") String a,
            @RequestBody Map<String, Object> b) {
        Object p = b.get("produto_id"), q = b.get("quantidade");
        if (p == null || q == null)
            throw new RuntimeException("Produto e quantidade são obrigatórios.");
        service.adicionarAoCarrinho(jwt.getId(a), Integer.parseInt(String.valueOf(p)),
                Integer.parseInt(String.valueOf(q)));
    }

    @GetMapping("/carrinho")
    public List<Map<String, Object>> ver(
            @RequestHeader("Authorization") String a) {
        return service.verCarrinho(jwt.getId(a));
    }

    @DeleteMapping("/carrinho/{produtoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void del(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer produtoId) {
        service.removerDoCarrinho(jwt.getId(a), produtoId);
    }
}
