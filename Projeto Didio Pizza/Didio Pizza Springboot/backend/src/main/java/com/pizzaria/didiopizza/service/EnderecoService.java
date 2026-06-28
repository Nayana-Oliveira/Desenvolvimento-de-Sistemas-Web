package com.pizzaria.didiopizza.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.pizzaria.didiopizza.repository.EnderecoRepository;

@Service
public class EnderecoService {
    private final EnderecoRepository repo;

    public EnderecoService(EnderecoRepository repo) {
        this.repo = repo;
    }

    private void validar(Map<String, Object> e) {
        if (e.get("rua") == null || e.get("numero") == null || e.get("bairro") == null || e.get("cidade") == null
                || e.get("cep") == null)
            throw new RuntimeException("Campos obrigatórios não preenchidos.");
    }

    public Integer adicionarEndereco(Integer clienteId, Map<String, Object> e) {
        validar(e);
        return repo.inserirEndereco(clienteId, e);
    }

    public List<Map<String, Object>> listarEnderecos(Integer c) {
        return repo.listarEnderecos(c);
    }

    public Map<String, Object> buscarEndereco(Integer c, Integer id) {
        var e = repo.buscarEnderecoPorId(c, id);
        if (e == null)
            throw new RuntimeException("Endereço não encontrado.");
        return e;
    }

    public void atualizarEndereco(Integer c, Integer id, Map<String, Object> e) {
        validar(e);
        if (repo.atualizarEndereco(c, id, e) == 0)
            throw new RuntimeException("Endereço não encontrado.");
    }

    public void removerEndereco(Integer c, Integer id) {
        if (repo.deletarEndereco(c, id) == 0)
            throw new RuntimeException("Endereço não encontrado.");
    }
}
