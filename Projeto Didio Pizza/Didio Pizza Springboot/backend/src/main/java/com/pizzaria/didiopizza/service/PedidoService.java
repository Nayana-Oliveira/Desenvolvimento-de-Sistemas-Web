package com.pizzaria.didiopizza.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pizzaria.didiopizza.repository.CarrinhoRepository;
import com.pizzaria.didiopizza.repository.EnderecoRepository;
import com.pizzaria.didiopizza.repository.PedidoRepository;

@Service
public class PedidoService {
    private final CarrinhoRepository carrinho;
    private final PedidoRepository pedido;
    private final EnderecoRepository endereco;
    private final LojaService loja;

    public PedidoService(CarrinhoRepository c, PedidoRepository p, EnderecoRepository e, LojaService l) {
        carrinho = c;
        pedido = p;
        endereco = e;
        loja = l;
    }

    @Transactional
    public Integer fecharPedido(Integer clienteId, Integer enderecoId) {
        loja.verificarLojaAberta();

        enderecoId = resolverEndereco(clienteId, enderecoId);

        var car = carrinho.buscarCarrinhoAtivo(clienteId);
        if (car == null)
            throw new RuntimeException("Carrinho vazio.");

        Integer carrinhoId = ((Number) car.get("id")).intValue();

        var itens = carrinho.listarItens(carrinhoId);
        if (itens.isEmpty())
            throw new RuntimeException("Carrinho sem itens.");

        Integer id = criarPedidoComLista(clienteId, enderecoId, itens);

        carrinho.limparCarrinho(carrinhoId);

        return id;
    }

    @Transactional
    public Integer fecharPedidoComItens(Integer clienteId, Integer enderecoId, List<Map<String, Object>> itens) {
        loja.verificarLojaAberta();

        if (itens == null || itens.isEmpty())
            throw new RuntimeException("Pedido sem itens.");

        enderecoId = resolverEndereco(clienteId, enderecoId);

        return criarPedidoComLista(clienteId, enderecoId, itens);
    }

    private Integer resolverEndereco(Integer clienteId, Integer enderecoId) {
        if (enderecoId != null && endereco.buscarEnderecoPorId(clienteId, enderecoId) != null) {
            return enderecoId;
        }

        var primeiroEndereco = endereco.buscarPrimeiroEndereco(clienteId);
        if (primeiroEndereco != null) {
            return ((Number) primeiroEndereco.get("id")).intValue();
        }

        return endereco.criarEnderecoPadrao(clienteId);
    }

    private Integer criarPedidoComLista(Integer clienteId, Integer enderecoId, List<Map<String, Object>> itens) {
        double total = 0;

        for (var item : itens) {
            double preco = Double.parseDouble(String.valueOf(item.getOrDefault("preco", 0)));
            int quantidade = Integer.parseInt(String.valueOf(item.getOrDefault("quantidade", 1)));
            total += preco * quantidade;
        }

        total += 8;

        Integer id = pedido.criarPedido(clienteId, enderecoId, total);
        pedido.inserirHistorico(id, "REGISTRADO");
        pedido.inserirItensPedido(id, itens);

        return id;
    }

    public List<Map<String, Object>> listarPedidos(Integer clienteId) {
        List<Map<String, Object>> pedidos = pedido.listarPedidosPorCliente(clienteId);

        for (Map<String, Object> p : pedidos) {
            Integer pedidoId = (Integer) p.get("id");

            List<Map<String, Object>> itens = pedido.listarItensPedido(pedidoId);

            p.put("itens", itens);
        }

        return pedidos;
    }

    
    public Map<String, Object> detalharPedido(Integer clienteId, Integer pedidoId) {
        var p = pedido.buscarPedidoPorId(pedidoId, clienteId);
        if (p == null)
            throw new RuntimeException("Pedido não encontrado.");

        p.put("itens", pedido.listarItensPedido(pedidoId));

        return p;
    }

    public Map<String, Object> detalharPedidoAdmin(Integer pedidoId) {
        var p = pedido.buscarPedidoPorIdSemCliente(pedidoId);
        if (p == null)
            throw new RuntimeException("Pedido não encontrado.");

        p.put("itens", pedido.listarItensPedido(pedidoId));

        return p;
    }

    public Map<String, Object> buscarStatusPedido(Integer pedidoId) {
        var p = pedido.buscarStatusPedido(pedidoId);
        if (p == null)
            throw new RuntimeException("Pedido não encontrado.");

        return p;
    }

    @Transactional
    public void atualizarStatusPedido(Integer id, String status) {
        status = String.valueOf(status)
                .trim()
                .toUpperCase()
                .replace(" ", "_")
                .replace("-", "_");

        if (!List.of("REGISTRADO", "PREPARANDO", "EM_ROTA", "ENTREGUE", "FINALIZADO").contains(status))
            throw new RuntimeException("Status inválido.");

        if (pedido.atualizarStatus(id, status) == 0)
            throw new RuntimeException("Pedido não encontrado.");

        pedido.inserirHistorico(id, status);
    }

    public List<Map<String, Object>> listarPedidosAdmin() {
        List<Map<String, Object>> pedidos = pedido.listarPedidosAdmin();

        for (Map<String, Object> p : pedidos) {
            Integer pedidoId = ((Number) p.get("id")).intValue();
            p.put("itens", pedido.listarItensPedido(pedidoId));
        }

        return pedidos;
    }
}
