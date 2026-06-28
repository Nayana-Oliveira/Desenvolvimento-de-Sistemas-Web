package com.pizzaria.didiopizza.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.pizzaria.didiopizza.repository.ProdutoRepository;

@Service
public class ProdutoService {
    private final ProdutoRepository repo;

    public ProdutoService(ProdutoRepository repo) {
        this.repo = repo;
    }

    private double num(Object v) {
        return v == null ? 0 : Double.parseDouble(String.valueOf(v));
    }

    public Integer salvarProduto(Map<String, Object> p) {
        if (p.get("nome") == null)
            throw new RuntimeException("Nome do produto é obrigatório.");

        if (num(p.get("preco")) <= 0)
            throw new RuntimeException("Preço deve ser maior que zero.");

        if (!List.of("P", "M", "G").contains(String.valueOf(p.get("tamanho"))))
            throw new RuntimeException("Tamanho inválido.");

        return repo.salvarProduto(p);
    }

    public List<Map<String, Object>> listarProduto() {
        return repo.listarProduto();
    }

    public Map<String, Object> buscarProdutoPorId(Integer id) {
        return repo.buscarProdutoPorId(id);
    }

    public int alterarProduto(Integer id, Map<String, Object> p) {
        if (p.get("nome") == null)
            throw new RuntimeException("Nome do produto é obrigatório.");

        if (!List.of("P", "M", "G").contains(String.valueOf(p.get("tamanho"))))
            throw new RuntimeException("Tamanho inválido.");

        if (num(p.get("preco")) <= 0)
            throw new RuntimeException("Preço deve ser maior que zero.");
        
        return repo.alterarProduto(id, p);
    }

    public int deletarProduto(Integer id) {
        return repo.deletarProduto(id);
    }

    public int atualizarFotoPizza(Integer id, String caminho) {
        return repo.atualizarFotoPizza(id, caminho);
    }
}
