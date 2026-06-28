package com.pizzaria.didiopizza.repository;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LojaRepository {
    private final JdbcTemplate db;

    public LojaRepository(JdbcTemplate db) {
        this.db = db;
    }

    public Map<String, Object> buscarStatusLoja() {
        var l = db.queryForList("SELECT aberta FROM loja WHERE id = 1");
        return l.isEmpty() ? null : l.get(0);
    }

    public int alterarStatusLoja(boolean status) {
        return db.update("UPDATE loja SET aberta = ? WHERE id = 1", status);
    }
}
