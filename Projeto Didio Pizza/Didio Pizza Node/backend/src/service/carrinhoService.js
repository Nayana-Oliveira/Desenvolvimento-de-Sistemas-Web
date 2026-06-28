import * as carrinhoRepository from '../repository/carrinhoRepository.js';


export async function adicionarAoCarrinho(clienteId, produtoId, quantidade) {

    if (quantidade <= 0) {
        throw new Error('Quantidade deve ser maior que zero.');
    }

    let carrinho = await carrinhoRepository.buscarCarrinhoAtivo(clienteId);

    if (!carrinho) {
        let carrinhoId = await carrinhoRepository.criarCarrinho(clienteId);

        carrinho = {
            id: carrinhoId
        };
    }

    let item = await carrinhoRepository.buscarItem(carrinho.id, produtoId);

    if (item) {
        await carrinhoRepository.atualizarQuantidade(item.id, quantidade);
    } else {
        await carrinhoRepository.adicionarItem(carrinho.id, produtoId, quantidade);
    }
}


export async function verCarrinho(clienteId) {

    let carrinho = await carrinhoRepository.buscarCarrinhoAtivo(clienteId);

    if (!carrinho) {
        return [];
    }

    let itens = await carrinhoRepository.listarItens(carrinho.id);

    return itens;
}


export async function removerDoCarrinho(clienteId, produtoId) {

    let carrinho = await carrinhoRepository.buscarCarrinhoAtivo(clienteId);

    if (!carrinho) {
        return 0;
    }

    let linhas = await carrinhoRepository.removerItem(carrinho.id, produtoId);

    return linhas;
}