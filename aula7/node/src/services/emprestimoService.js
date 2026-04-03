import * as repo from '../repository/emprestimoRepository.js';
import * as obraRepo from '../repository/obraRepository.js';
import * as clienteRepo from '../repository/clienteRepository.js';

export async function registrarEmprestimo(emp) {
  let cliente = await clienteRepo.buscarClientePorId(emp.cliente_id);
  if (cliente.bloqueadoAte && new Date(cliente.bloqueadoAte) >= new Date()) {
    throw new Error('Cliente bloqueado!');
  }

  let obra = await obraRepo.buscarObraPorId(emp.obra_id);
  if (obra.estoque <= 0) {
    throw new Error('Sem estoque!');
  }

  await obraRepo.incrementarEstoque(emp.obra_id, -1);
  return await repo.salvarEmprestimo(emp);
}

export async function listarEmprestimos(status) {
  return await repo.listarEmprestimos(status);
}

export async function devolverEmprestimo(id, dados) {
  let emp = await repo.buscarEmprestimoPorId(id);
  if (!emp) return 0;

  let atraso = 0;
  let status = 'devolvido';

  let hoje = new Date(dados.dataDevolucao);
  let prevista = new Date(emp.dataPrevista);

  if (hoje > prevista) {
    atraso = Math.ceil((hoje - prevista) / (1000 * 60 * 60 * 24));
    status = 'devolvido_com_atraso';

    let bloqueio = new Date();
    bloqueio.setDate(bloqueio.getDate() + 3);
    await clienteRepo.atualizarBloqueio(emp.cliente_id, bloqueio);
  }

  await obraRepo.incrementarEstoque(emp.obra_id, 1);
  return await repo.devolverEmprestimo(id, atraso, status, dados);
}


