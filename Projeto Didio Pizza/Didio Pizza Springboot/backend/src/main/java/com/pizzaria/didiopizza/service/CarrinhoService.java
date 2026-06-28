package com.pizzaria.didiopizza.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.pizzaria.didiopizza.repository.CarrinhoRepository;

@Service
public class CarrinhoService {
    private final CarrinhoRepository repo;

    public CarrinhoService(CarrinhoRepository repo) {
        this.repo = repo;
    }

    public void adicionarAoCarrinho(Integer clienteId, Integer produtoId, Integer qtd) {
        if (qtd == null || qtd <= 0)
            throw new RuntimeException("Quantidade deve ser maior que zero.");
        var carrinho = repo.buscarCarrinhoAtivo(clienteId);
        Integer carrinhoId = carrinho == null ? repo.criarCarrinho(clienteId)
                : ((Number) carrinho.get("id")).intValue();
        var item = repo.buscarItem(carrinhoId, produtoId);
        if (item != null)
            repo.atualizarQuantidade(((Number) item.get("id")).intValue(), qtd);
        else
            repo.adicionarItem(carrinhoId, produtoId, qtd);
    }

    public List<Map<String, Object>> verCarrinho(Integer clienteId) {
        var c = repo.buscarCarrinhoAtivo(clienteId);
        return c == null ? List.of() : repo.listarItens(((Number) c.get("id")).intValue());
    }

    public int removerDoCarrinho(Integer clienteId, Integer produtoId) {
        var c = repo.buscarCarrinhoAtivo(clienteId);
        return c == null ? 0 : repo.removerItem(((Number) c.get("id")).intValue(), produtoId);
    }
}
