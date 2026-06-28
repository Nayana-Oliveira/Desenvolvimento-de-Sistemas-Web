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
public class EnderecoRepository {
    private final JdbcTemplate db;

    public EnderecoRepository(JdbcTemplate db) {
        this.db = db;
    }

    public Integer inserirEndereco(Integer clienteId, Map<String, Object> e) {
        KeyHolder kh = new GeneratedKeyHolder();
        db.update(c -> {
            PreparedStatement ps = c.prepareStatement(
                    "INSERT INTO endereco (cliente_id, rua, numero, bairro, cidade, cep, complemento) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, clienteId);
            ps.setObject(2, e.get("rua"));
            ps.setObject(3, e.get("numero"));
            ps.setObject(4, e.get("bairro"));
            ps.setObject(5, e.get("cidade"));
            ps.setObject(6, e.get("cep"));
            ps.setObject(7, e.get("complemento"));
            return ps;
        }, kh);
        return kh.getKey().intValue();
    }

    public List<Map<String, Object>> listarEnderecos(Integer clienteId) {
        return db.queryForList("SELECT * FROM endereco WHERE cliente_id = ?", clienteId);
    }

    public Map<String, Object> buscarEnderecoPorId(Integer clienteId, Integer enderecoId) {
        var l = db.queryForList("SELECT * FROM endereco WHERE id = ? AND cliente_id = ?", enderecoId, clienteId);
        return l.isEmpty() ? null : l.get(0);
    }

    public Map<String, Object> buscarPrimeiroEndereco(Integer clienteId) {
        var l = db.queryForList("SELECT * FROM endereco WHERE cliente_id = ? ORDER BY id ASC LIMIT 1", clienteId);
        return l.isEmpty() ? null : l.get(0);
    }

    public Integer criarEnderecoPadrao(Integer clienteId) {
        return inserirEndereco(clienteId, Map.of(
                "rua", "Av. Paulista",
                "numero", "1578",
                "bairro", "Bela Vista",
                "cidade", "São Paulo",
                "cep", "01310-200",
                "complemento", "Endereço padrão"
        ));
    }

    public int atualizarEndereco(Integer clienteId, Integer id, Map<String, Object> e) {
        return db.update(
                "UPDATE endereco SET rua = ?, numero = ?, bairro = ?, cidade = ?, cep = ?, complemento = ? WHERE id = ? AND cliente_id = ?",
                e.get("rua"), e.get("numero"), e.get("bairro"), e.get("cidade"), e.get("cep"), e.get("complemento"), id,
                clienteId);
    }

    public int deletarEndereco(Integer clienteId, Integer id) {
        return db.update("DELETE FROM endereco WHERE id = ? AND cliente_id = ?", id, clienteId);
    }
}
