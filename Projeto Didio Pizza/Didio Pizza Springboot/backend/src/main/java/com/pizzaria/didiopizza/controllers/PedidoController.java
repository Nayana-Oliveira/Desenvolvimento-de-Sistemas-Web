package com.pizzaria.didiopizza.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.pizzaria.didiopizza.security.JwtUtil;
import com.pizzaria.didiopizza.service.PedidoService;

@RestController
public class PedidoController {
    private final PedidoService service;
    private final JwtUtil jwt;

    public PedidoController(PedidoService s, JwtUtil j) {
        service = s;
        jwt = j;
    }

    @PostMapping("/pedido")
    public ResponseEntity<?> criar(
            @RequestHeader("Authorization") String a,
            @RequestBody Map<String, Object> b) {
        Object e = b.get("endereco_id");
        Integer enderecoId = e == null ? null : Integer.parseInt(String.valueOf(e));

        Object itens = b.get("itens");

        if (itens instanceof List<?> lista && !lista.isEmpty()) {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> itensPedido = (List<Map<String, Object>>) itens;

            return ResponseEntity.status(201)
                    .body(Map.of("id", service.fecharPedidoComItens(jwt.getId(a), enderecoId, itensPedido)));
        }

        return ResponseEntity.status(201)
                .body(Map.of("id", service.fecharPedido(jwt.getId(a), enderecoId)));
    }

    @GetMapping("/pedido")
    public List<Map<String, Object>> listar(
            @RequestHeader("Authorization") String a) {
        return service.listarPedidos(jwt.getId(a));
    }

    @GetMapping("/pedido/{id}")
    public Map<String, Object> detalhe(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id) {
        if ("ADMIN".equalsIgnoreCase(jwt.getTipo(a))) {
            return service.detalharPedidoAdmin(id);
        }

        return service.detalharPedido(jwt.getId(a), id);
    }

    @GetMapping("/pedido/{id}/status")
    public Map<String, Object> statusPublico(@PathVariable Integer id) {
        return service.buscarStatusPedido(id);
    }

    @PutMapping("/pedido/{id}/status")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void status(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id,
            @RequestBody Map<String, Object> b) {
        jwt.onlyAdmin(a);
        if (b.get("status") == null)
            throw new RuntimeException("Status é obrigatório.");
        service.atualizarStatusPedido(id, String.valueOf(b.get("status")));
    }

    @GetMapping("/pedidos/admin")
    public List<Map<String, Object>> admin(
            @RequestHeader("Authorization") String a) {
        jwt.onlyAdmin(a);
        return service.listarPedidosAdmin();
    }
}
