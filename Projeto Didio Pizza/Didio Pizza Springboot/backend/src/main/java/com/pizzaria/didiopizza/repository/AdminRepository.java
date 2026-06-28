package com.pizzaria.didiopizza.repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepository {
    private final JdbcTemplate db;

    public AdminRepository(JdbcTemplate db) {
        this.db = db;
    }

    public Integer criarConta(Map<String, Object> admin) {
        KeyHolder kh = new GeneratedKeyHolder();
        db.update(c -> {
            PreparedStatement ps = c.prepareStatement("INSERT INTO admin (email, senha) VALUES (?, MD5(?))",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, admin.get("email"));
            ps.setObject(2, admin.get("senha"));
            return ps;
        }, kh);
        return kh.getKey().intValue();
    }

    public Map<String, Object> login(String email, String senha) {
        var l = db.queryForList(
                "SELECT id, email FROM admin WHERE email = ? AND senha = MD5(?)",
                email,
                senha);
        return l.isEmpty() ? null : l.get(0);
    }

    public Map<String, Object> buscarAdminPorEmail(String email) {
        var l = db.queryForList(
                "SELECT * FROM admin WHERE email = ?",
                email);
        return l.isEmpty() ? null : l.get(0);
    }
}
