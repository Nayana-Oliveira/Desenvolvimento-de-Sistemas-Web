package com.pizzaria.didiopizza.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.pizzaria.didiopizza.repository.ClienteRepository;
import com.pizzaria.didiopizza.security.JwtUtil;

@Service
public class ClienteService {
    private final ClienteRepository repo;
    private final JwtUtil jwt;

    public ClienteService(ClienteRepository repo, JwtUtil jwt) {
        this.repo = repo;
        this.jwt = jwt;
    }

    public Integer criarCliente(Map<String, Object> c) {
        if (c.get("nome") == null || c.get("email") == null || c.get("senha") == null)
            throw new RuntimeException("Dados incompletos. Preencha todos os campos obrigatórios.");
        if (repo.buscarPorEmail(String.valueOf(c.get("email"))) != null)
            throw new RuntimeException("Email já cadastrado. Por favor, utilize um email diferente.");
        return repo.criarConta(c);
    }

    public String loginCliente(Map<String, Object> c) {
        var u = repo.login(String.valueOf(c.get("email")), String.valueOf(c.get("senha")));
        if (u == null)
            throw new RuntimeException("Email ou senha inválidos. Verifique suas credenciais e tente novamente.");
        return jwt.generateToken(((Number) u.get("id")).intValue(), "CLIENTE");
    }

    public Map<String, Object> buscarPerfil(Integer id) {
        var c = repo.buscarPerfilCompleto(id);
        if (c == null)
            throw new RuntimeException("Cliente não encontrado.");
        return c;
    }

    public void atualizarPerfil(Integer id, String nome, String email, String telefone) {
        if (nome == null || email == null)
            throw new RuntimeException("Nome e email são obrigatórios.");
        if (repo.atualizarCliente(id, nome, email, telefone) == 0)
            throw new RuntimeException("Erro ao atualizar dados.");
    }
}
