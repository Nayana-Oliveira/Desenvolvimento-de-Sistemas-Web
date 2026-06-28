package com.pizzaria.didiopizza.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pizzaria.didiopizza.repository.PagamentoRepository;
import com.pizzaria.didiopizza.repository.PedidoRepository;

@Service
public class PagamentoService {
    private final PagamentoRepository pagamento;
    private final PedidoRepository pedido;

    public PagamentoService(PagamentoRepository pagamento, PedidoRepository pedido) {
        this.pagamento = pagamento;
        this.pedido = pedido;
    }

    @Transactional
    public Integer realizarPagamento(Integer clienteId, Integer pedidoId, String tipo) {
        if (pedidoId == null || tipo == null)
            throw new RuntimeException("Pedido e tipo são obrigatórios.");

        tipo = tipo.toUpperCase();
        if (!List.of("DINHEIRO", "CARTAO", "PIX").contains(tipo))
            throw new RuntimeException("Tipo inválido.");

        var p = pedido.buscarPedidoPorId(pedidoId, clienteId);
        if (p == null)
            throw new RuntimeException("Pedido não encontrado.");

        if (!"REGISTRADO".equals(String.valueOf(p.get("status"))))
            throw new RuntimeException("Pedido não está disponível para pagamento.");

        if (Double.parseDouble(String.valueOf(p.get("total"))) <= 0)
            throw new RuntimeException("Valor do pedido inválido.");

        if (pagamento.buscarPagamentoPorPedido(pedidoId) != null)
            throw new RuntimeException("Pedido já pago.");

        Integer id = pagamento.inserirPagamento(clienteId, pedidoId, tipo, p.get("total"));
        if (pedido.atualizarStatus(pedidoId, "PREPARANDO") == 0)
            throw new RuntimeException("Erro ao atualizar status do pedido.");

        pedido.inserirHistorico(pedidoId, "PREPARANDO");

        return id;
    }
}
