package com.pizzaria.didiopizza.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.pizzaria.didiopizza.repository.EstoqueRepository;

@Service
public class EstoqueService {
    private final EstoqueRepository repo;

    public EstoqueService(EstoqueRepository repo) {
        this.repo = repo;
    }

    private double num(Object v) {
        return v == null ? 0 : Double.parseDouble(String.valueOf(v));
    }

    public Integer criar(Map<String, Object> i) {
        if (i.get("nome") == null || i.get("quantidade") == null || i.get("unidade") == null)
            throw new RuntimeException("Todos os campos são obrigatórios.");
        if (num(i.get("quantidade")) < 0)
            throw new RuntimeException("Quantidade inválida.");
        return repo.inserir(i);
    }

    public List<Map<String, Object>> listar() {
        return repo.listar();
    }

    public void atualizar(Integer id, Map<String, Object> i) {
        if (i.get("nome") == null || i.get("quantidade") == null || i.get("unidade") == null)
            throw new RuntimeException("Campos obrigatórios.");
        if (repo.atualizar(id, i) == 0)
            throw new RuntimeException("Item não encontrado.");
    }

    public void remover(Integer id) {
        if (repo.deletar(id) == 0)
            throw new RuntimeException("Item não encontrado.");
    }
}
