import * as repo from '../repository/emprestimoRepository.js';

export async function criar(emp) {

    let cliente = await repo.buscarCliente(emp.cliente_id);

    if (!cliente){
        throw new Error('Cliente não encontrado');
    }

    let hoje = new Date();

    if (cliente.bloqueadoAte && new Date(cliente.bloqueadoAte) >= hoje){
        throw new Error('Cliente bloqueado');
    }

    let obra = await repo.buscarObra(emp.obra_id);

    if (!obra || obra.estoque <= 0){
        throw new Error('Sem estoque');
    }

    await repo.diminuirEstoque(emp.obra_id);

    return await repo.inserir(emp);
}

export async function listar() {
    return await repo.listar();
}

export async function devolver(id, dados) {

    let emp = await repo.buscar(id);

    if (!emp){
        throw new Error('Empréstimo não encontrado');
    }

    let dataPrevista = new Date(emp.dataPrevista);
    let dataDev = new Date(dados.dataDevolucao);

    let diasAtraso = 0;

    if (dataDev > dataPrevista) {
        diasAtraso = Math.ceil((dataDev - dataPrevista) / (1000 * 60 * 60 * 24));
    }

    let status = diasAtraso > 0 ? 'devolvido_com_atraso' : 'devolvido';

    await repo.aumentarEstoque(emp.obra_id);

    await repo.atualizarDevolucao(id, {
        dataDevolucao: dados.dataDevolucao,
        diasAtraso,
        status,
        observacao: dados.observacao
    });

    return { 
        status, diasAtraso 
    };
}