package com.pizzaria.didiopizza.repository;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CategoriaRepository {
    private final JdbcTemplate db;

    public CategoriaRepository(JdbcTemplate db) {
        this.db = db;
    }

    public List<Map<String, Object>> listarCategorias() {
        return db.queryForList("SELECT * FROM categoria");
    }
}
