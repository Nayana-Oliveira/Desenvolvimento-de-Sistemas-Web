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
public class PedidoRepository {
    private final JdbcTemplate db;

    public PedidoRepository(JdbcTemplate db) {
        this.db = db;
    }

    @PostConstruct
    public void garantirEnumStatusAtualizado() {
        try {
            db.execute("ALTER TABLE pedido MODIFY status ENUM('REGISTRADO','PREPARANDO','EM_ROTA','ENTREGUE','FINALIZADO') DEFAULT 'REGISTRADO'");
            db.execute("ALTER TABLE pedido_status_historico MODIFY status ENUM('REGISTRADO','PREPARANDO','EM_ROTA','ENTREGUE','FINALIZADO')");
        } catch (Exception ignored) {
            // Mantém a aplicação subindo mesmo se o banco já estiver atualizado
            // ou se o usuário ainda não tiver criado a tabela de histórico.
        }
    }

    public Integer criarPedido(Integer clienteId, Integer enderecoId, Double total) {
        KeyHolder kh = new GeneratedKeyHolder();
        db.update(c -> {
            PreparedStatement ps = c.prepareStatement(
                    "INSERT INTO pedido (cliente_id, endereco_id, status, total) VALUES (?, ?, 'REGISTRADO', ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setObject(1, clienteId);
            ps.setObject(2, enderecoId);
            ps.setObject(3, total);
            return ps;
        }, kh);
        return kh.getKey().intValue();
    }

    public void inserirItensPedido(Integer pedidoId, List<Map<String, Object>> itens) {
        for (var item : itens) {
            Object produtoId = item.get("produto_id") != null ? item.get("produto_id") : item.get("id");
            Object quantidade = item.get("quantidade") != null ? item.get("quantidade") : 1;
            Object preco = item.get("preco") != null ? item.get("preco") : 0;
            Object observacao = item.get("observacao");

            if (observacao == null) {
                String tamanho = String.valueOf(item.getOrDefault("tamanho", ""));
                String borda = String.valueOf(item.getOrDefault("borda", ""));
                observacao = ("Tamanho: " + tamanho + " | Borda: " + borda).trim();
            }

            db.update("INSERT INTO pedido_item (pedido_id, produto_id, quantidade, preco, observacao) VALUES (?, ?, ?, ?, ?)",
                    pedidoId, produtoId, quantidade, preco, observacao);
        }
    }

    public List<Map<String, Object>> listarPedidosPorCliente(Integer clienteId) {
        return db.queryForList(
                """
                        SELECT
                            pedido.id,
                            pedido.data,
                            pedido.status,
                            pedido.total,
                            endereco.rua,
                            endereco.numero,
                            endereco.bairro,
                            endereco.cidade,
                            endereco.cep,
                            endereco.complemento
                        FROM pedido
                        INNER JOIN endereco ON pedido.endereco_id = endereco.id
                        WHERE pedido.cliente_id = ?
                        ORDER BY pedido.data DESC
                        """,
                clienteId);
    }


    public Map<String, Object> buscarPedidoPorId(Integer pedidoId, Integer clienteId) {
        var l = db.queryForList("SELECT id, data, status, total FROM pedido WHERE id = ? AND cliente_id = ?", pedidoId,
                clienteId);
        return l.isEmpty() ? null : l.get(0);
    }


    public Map<String, Object> buscarPedidoPorIdSemCliente(Integer pedidoId) {
        var l = db.queryForList("SELECT id, data, status, total FROM pedido WHERE id = ?", pedidoId);
        return l.isEmpty() ? null : l.get(0);
    }

    public Map<String, Object> buscarStatusPedido(Integer pedidoId) {
        var l = db.queryForList("SELECT id, status FROM pedido WHERE id = ?", pedidoId);
        return l.isEmpty() ? null : l.get(0);
    }

    public List<Map<String, Object>> listarItensPedido(Integer pedidoId) {
        return db.queryForList(
                """
                        SELECT
                            produto.id AS produto_id,
                            produto.nome AS produto,
                            produto.nome AS nome,
                            produto.tamanho,
                            produto.imagem,
                            pedido_item.quantidade,
                            pedido_item.preco,
                            pedido_item.observacao
                        FROM pedido_item
                        INNER JOIN produto ON pedido_item.produto_id = produto.id
                        WHERE pedido_item.pedido_id = ?
                        """,
                pedidoId);
    }

    public int atualizarStatus(Integer pedidoId, String status) {
        return db.update("UPDATE pedido SET status = ? WHERE id = ?",
                status,
                pedidoId);
    }

    public void inserirHistorico(Integer pedidoId, String status) {
        db.update("INSERT INTO pedido_status_historico (pedido_id, status, data) VALUES (?, ?, NOW())",
                pedidoId,
                status);
    }

    public List<Map<String, Object>> listarPedidosAdmin() {
        return db.queryForList(
                """
                        SELECT
                            pedido.id,
                            pedido.data,
                            pedido.status,
                            pedido.total,
                            cliente.nome AS cliente,
                            cliente.email AS cliente_email,
                            endereco.rua,
                            endereco.numero,
                            endereco.bairro,
                            endereco.cidade,
                            endereco.cep,
                            endereco.complemento
                        FROM pedido
                        INNER JOIN cliente ON pedido.cliente_id = cliente.id
                        INNER JOIN endereco ON pedido.endereco_id = endereco.id
                        WHERE DATE(pedido.data) = CURDATE()
                           OR pedido.status IN ('REGISTRADO', 'PREPARANDO', 'EM_ROTA')
                        ORDER BY pedido.data DESC
                        """);
    }
}
