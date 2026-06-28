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
public class EstoqueRepository {
    private final JdbcTemplate db;

    public EstoqueRepository(JdbcTemplate db) {
        this.db = db;
    }

    public Integer inserir(Map<String, Object> i) {
        KeyHolder kh = new GeneratedKeyHolder();
        db.update(c -> {
            PreparedStatement ps = c.prepareStatement(
                    "INSERT INTO estoque (nome, quantidade, unidade) VALUES (?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, i.get("nome"));
            ps.setObject(2, i.get("quantidade"));
            ps.setObject(3, i.get("unidade"));
            return ps;
        }, kh);
        return kh.getKey().intValue();
    }

    public List<Map<String, Object>> listar() {
        return db.queryForList("SELECT * FROM estoque");
    }

    public int atualizar(Integer id, Map<String, Object> i) {
        return db.update("UPDATE estoque SET nome = ?, quantidade = ?, unidade = ? WHERE id = ?", i.get("nome"),
                i.get("quantidade"), i.get("unidade"), id);
    }

    public int deletar(Integer id) {
        return db.update("DELETE FROM estoque WHERE id = ?", id);
    }
}
