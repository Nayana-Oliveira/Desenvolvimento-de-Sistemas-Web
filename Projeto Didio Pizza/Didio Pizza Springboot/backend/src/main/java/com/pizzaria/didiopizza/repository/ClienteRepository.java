package com.pizzaria.didiopizza.repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class ClienteRepository {
    private final JdbcTemplate db;

    public ClienteRepository(JdbcTemplate db) {
        this.db = db;
    }

    public Integer criarConta(Map<String, Object> c) {
        KeyHolder kh = new GeneratedKeyHolder();
        db.update(conn -> {
            PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO cliente (nome, email, telefone, senha) VALUES (?, ?, ?, MD5(?))",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, c.get("nome"));
            ps.setObject(2, c.get("email"));
            ps.setObject(3, c.get("telefone"));
            ps.setObject(4, c.get("senha"));
            return ps;
        }, kh);
        return kh.getKey().intValue();
    }

    public Map<String, Object> login(String email, String senha) {
        var l = db.queryForList("SELECT id, nome, email FROM cliente WHERE email = ? AND senha = MD5(?)", email, senha);
        return l.isEmpty() ? null : l.get(0);
    }

    public Map<String, Object> buscarPorEmail(String email) {
        var l = db.queryForList("SELECT * FROM cliente WHERE email = ?", email);
        return l.isEmpty() ? null : l.get(0);
    }

    public Map<String, Object> buscarPerfilCompleto(Integer id) {
        var l = db.queryForList(
                """
                        SELECT cliente.nome, cliente.email, cliente.telefone, endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.cep, endereco.complemento
                        FROM cliente LEFT JOIN endereco ON endereco.cliente_id = cliente.id WHERE cliente.id=?
                        """,
                id);
        return l.isEmpty() ? null : l.get(0);
    }

    public int atualizarCliente(Integer id, String nome, String email, String telefone) {
        return db.update("UPDATE cliente SET nome = ?, email = ?, telefone = ? WHERE id = ?", nome, email, telefone,
                id);
    }
}
