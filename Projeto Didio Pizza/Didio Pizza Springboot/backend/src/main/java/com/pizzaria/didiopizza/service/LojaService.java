package com.pizzaria.didiopizza.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.pizzaria.didiopizza.repository.LojaRepository;

@Service
public class LojaService {
    private final LojaRepository repo;

    public LojaService(LojaRepository repo) {
        this.repo = repo;
    }

    public void verificarLojaAberta() {
        var l = repo.buscarStatusLoja();
        if (!isLojaAberta(l))
            throw new RuntimeException("Loja está fechada.");
    }

    public Map<String, Object> verificarStatusLoja() {
        var l = repo.buscarStatusLoja();
        return Map.of("aberta", isLojaAberta(l));
    }

    private boolean isLojaAberta(Map<String, Object> loja) {
        if (loja == null || loja.get("aberta") == null) {
            return false;
        }

        Object aberta = loja.get("aberta");

        if (aberta instanceof Boolean) {
            return (Boolean) aberta;
        }

        if (aberta instanceof Number) {
            return ((Number) aberta).intValue() == 1;
        }

        return "true".equalsIgnoreCase(String.valueOf(aberta)) || "1".equals(String.valueOf(aberta));
    }

    public void abrirLoja() {
        if (repo.alterarStatusLoja(true) == 0)
            throw new RuntimeException("Erro ao abrir loja.");
    }

    public void fecharLoja() {
        if (repo.alterarStatusLoja(false) == 0)
            throw new RuntimeException("Erro ao fechar loja.");
    }
}
