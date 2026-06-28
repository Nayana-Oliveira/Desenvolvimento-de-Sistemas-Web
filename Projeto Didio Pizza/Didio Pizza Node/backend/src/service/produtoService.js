import * as produtoRepository from '../repository/produtoRepository.js';


export async function salvarProduto(produto) {

    if (!produto.nome) {
        throw new Error('Nome do produto é obrigatório.');
    }

    if (produto.preco <= 0) {
        throw new Error('Preço deve ser maior que zero.');
    }

    if (!['P', 'M', 'G'].includes(produto.tamanho)) {
        throw new Error('Tamanho inválido.');
    }

    let id = await produtoRepository.salvarProduto(produto);
    return id;
}


export async function listarProduto() {
    let linhas = await produtoRepository.listarProduto();
    return linhas;
}


export async function buscarProdutoPorId(id) {
    let linha = await produtoRepository.buscarProdutoPorId(id);
    return linha;
}


export async function alterarProduto(id, produto) {
    
    if (!produto.nome) {
        throw new Error('Nome do produto é obrigatório.');
    }

    if (!['P', 'M', 'G'].includes(produto.tamanho)) {
        throw new Error('Tamanho inválido.');
    }

    if (produto.preco <= 0) {
        throw new Error('Preço deve ser maior que zero.');
    }

    let linhasAfetadas = await produtoRepository.alterarProduto(id, produto);
    return linhasAfetadas;
}


export async function deletarProduto(id) {
    let linhasAfetadas = await produtoRepository.deletarProduto(id);
    return linhasAfetadas;
}


export async function atualizarFotoPizza(id, caminho) {
    let linhasAfetadas = await produtoRepository.atualizarFotoPizza(id, caminho);

    return linhasAfetadas;
} 