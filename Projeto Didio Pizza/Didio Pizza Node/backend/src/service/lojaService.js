import * as lojaRepository from '../repository/lojaRepository.js';


export async function verificarLojaAberta() {
    let loja = await lojaRepository.buscarStatusLoja();

    if (!loja || !loja.aberta) {
        throw new Error('Loja está fechada.');
    }
}


export async function verificarStatusLoja() {
    
    let loja = await lojaRepository.buscarStatusLoja();

    return {
        aberta: loja?.aberta ?? false
    };
}


export async function abrirLoja() {
    let linhas = await lojaRepository.alterarStatusLoja(true);

    if (linhas === 0) {
        throw new Error('Erro ao abrir loja.');
    }
}


export async function fecharLoja() {
    let linhas = await lojaRepository.alterarStatusLoja(false);

    if (linhas === 0) {
        throw new Error('Erro ao fechar loja.');
    }
}