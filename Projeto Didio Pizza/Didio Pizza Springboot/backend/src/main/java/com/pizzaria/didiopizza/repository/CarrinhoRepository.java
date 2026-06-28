package com.pizzaria.didiopizza.repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class CarrinhoRepository {

    private final JdbcTemplate db;

    public CarrinhoRepository(JdbcTemplate db) {
        this.db = db;
    }

    public Map<String, Object> buscarCarrinhoAtivo(Integer clienteId) {
        var l = db.queryForList("SELECT * FROM carrinho WHERE cliente_id = ? AND ativo = TRUE", clienteId);
        return l.isEmpty() ? null : l.get(0);
    }

    public Integer criarCarrinho(Integer clienteId) {
        KeyHolder kh = new GeneratedKeyHolder();
        db.update(c -> {
            PreparedStatement ps = c.prepareStatement("INSERT INTO carrinho (cliente_id, ativo) VALUES (?, TRUE)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, clienteId);
            return ps;
        }, kh);
        return kh.getKey().intValue();
    }

    public void adicionarItem(Integer carrinhoId, Integer produtoId, Integer qtd) {
        db.update("INSERT INTO carrinho_item (carrinho_id, produto_id, quantidade) VALUES (?, ?, ?)",
                carrinhoId,
                produtoId,
                qtd);
    }

    public Map<String, Object> buscarItem(Integer carrinhoId, Integer produtoId) {
        var l = db.queryForList("SELECT * FROM carrinho_item WHERE carrinho_id = ? AND produto_id = ?",
                carrinhoId,
                produtoId);
        return l.isEmpty() ? null : l.get(0);
    }

    public void atualizarQuantidade(Integer itemId, Integer qtd) {
        db.update("UPDATE carrinho_item SET quantidade = quantidade + ? WHERE id = ?",
                qtd,
                itemId);
    }

    public List<Map<String, Object>> listarItens(Integer carrinhoId) {
        return db.queryForList(
                """
                        SELECT carrinho_item.id, carrinho_item.produto_id, produto.nome, produto.preco, carrinho_item.quantidade
                        FROM carrinho_item INNER JOIN produto ON carrinho_item.produto_id=produto.id WHERE carrinho_item.carrinho_id=?
                        """,
                carrinhoId);
    }

    public int removerItem(Integer carrinhoId, Integer produtoId) {

        var item = buscarItem(carrinhoId, produtoId);

        if (item == null) {

            return 0;
        }

        Integer itemId = ((Number) item.get("id")).intValue();

        Integer quantidade = ((Number) item.get("quantidade")).intValue();

        if (quantidade > 1) {

            return db.update(
                    "UPDATE carrinho_item SET quantidade = quantidade - 1 WHERE id = ?",
                    itemId
            );
        }

        return db.update(
                "DELETE FROM carrinho_item WHERE id = ?",
                itemId
        );
    }

    public void limparCarrinho(Integer carrinhoId) {
        db.update("DELETE FROM carrinho_item WHERE carrinho_id = ?",
                carrinhoId);
    }
}
