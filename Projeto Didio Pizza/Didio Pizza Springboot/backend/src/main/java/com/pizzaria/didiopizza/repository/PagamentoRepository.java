package com.pizzaria.didiopizza.repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class PagamentoRepository {
    private final JdbcTemplate db;

    public PagamentoRepository(JdbcTemplate db) {
        this.db = db;
    }

    public Integer inserirPagamento(Integer clienteId, Integer pedidoId, String tipo, Object valor) {
        KeyHolder kh = new GeneratedKeyHolder();
        db.update(c -> {
            PreparedStatement ps = c.prepareStatement(
                    "INSERT INTO pagamento (cliente_id, pedido_id, tipo,status, valor) VALUES (?, ?, ?, 'PAGO', ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, clienteId);
            ps.setObject(2, pedidoId);
            ps.setObject(3, tipo);
            ps.setObject(4, valor);
            return ps;
        }, kh);
        return kh.getKey().intValue();
    }

    public Map<String, Object> buscarPagamentoPorPedido(Integer pedidoId) {
        var l = db.queryForList("SELECT * FROM pagamento WHERE pedido_id = ?", pedidoId);
        return l.isEmpty() ? null : l.get(0);
    }
}
