package com.pizzaria.didiopizza.repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import jakarta.annotation.PostConstruct;

@Repository
public class ProdutoRepository {
    private final JdbcTemplate db;

    public ProdutoRepository(JdbcTemplate db) {
        this.db = db;
    }

    @PostConstruct
    public void garantirCampoAtivo() {
        try {
            db.execute("ALTER TABLE produto ADD COLUMN ativo BOOLEAN DEFAULT TRUE");
        } catch (Exception ignored) {
            // Campo já existe ou o banco ainda não está pronto.
        }
    }

    public Integer salvarProduto(Map<String, Object> p) {
        KeyHolder kh = new GeneratedKeyHolder();
        db.update(c -> {
            PreparedStatement ps = c.prepareStatement(
                    "INSERT INTO produto (categoria_id,nome,descricao,imagem,tamanho,preco,ativo) VALUES (?,?,?,?,?,?,TRUE)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, p.get("categoria_id"));
            ps.setObject(2, p.get("nome"));
            ps.setObject(3, p.get("descricao"));
            ps.setObject(4, p.get("imagem"));
            ps.setObject(5, p.get("tamanho"));
            ps.setObject(6, p.get("preco"));
            return ps;
        }, kh);
        return kh.getKey().intValue();
    }

    public List<Map<String, Object>> listarProduto() {
        return db.queryForList(
                """
                            SELECT produto.id, produto.categoria_id, produto.nome, produto.descricao, produto.imagem, produto.tamanho, produto.preco, categoria.nome AS categoria
                            FROM produto
                            INNER JOIN categoria ON produto.categoria_id = categoria.id
                            WHERE produto.ativo = TRUE
                            ORDER BY produto.id DESC
                        """);
    }

    public Map<String, Object> buscarProdutoPorId(Integer id) {
        var l = db.queryForList(
                """
                        SELECT produto.id, produto.categoria_id, produto.nome, produto.descricao, produto.imagem, produto.tamanho, produto.preco, categoria.nome AS categoria
                        FROM produto
                        INNER JOIN categoria ON produto.categoria_id = categoria.id
                        WHERE produto.id = ? AND produto.ativo = TRUE
                        """,
                id);

        return l.isEmpty() ? null : l.get(0);
    }

    public int alterarProduto(Integer id, Map<String, Object> p) {
        return db.update(
                "UPDATE produto SET categoria_id = ?, nome = ?, descricao = ?, tamanho = ?, preco = ? WHERE id = ? AND ativo = TRUE",
                p.get("categoria_id"), p.get("nome"), p.get("descricao"), p.get("tamanho"), p.get("preco"), id);
    }

    public int deletarProduto(Integer id) {
        return db.update("UPDATE produto SET ativo = FALSE WHERE id = ? AND ativo = TRUE", id);
    }

    public int atualizarFotoPizza(Integer id, String caminho) {
        return db.update("UPDATE produto SET imagem = ? WHERE id = ? AND ativo = TRUE", caminho, id);
    }
}
