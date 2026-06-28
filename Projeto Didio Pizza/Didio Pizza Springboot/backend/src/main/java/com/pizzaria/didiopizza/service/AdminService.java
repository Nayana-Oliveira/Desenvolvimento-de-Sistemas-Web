package com.pizzaria.didiopizza.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.pizzaria.didiopizza.repository.AdminRepository;
import com.pizzaria.didiopizza.security.JwtUtil;

@Service
public class AdminService {
    private final AdminRepository repo;
    private final JwtUtil jwt;

    public AdminService(AdminRepository repo, JwtUtil jwt) {
        this.repo = repo;
        this.jwt = jwt;
    }

    public Integer criarAdmin(Map<String, Object> a) {
        if (a.get("email") == null || a.get("senha") == null)
            throw new RuntimeException("Dados incompletos.");
        if (repo.buscarAdminPorEmail(String.valueOf(a.get("email"))) != null)
            throw new RuntimeException("Email já cadastrado.");
        return repo.criarConta(a);
    }

    public String loginAdmin(Map<String, Object> a) {
        var u = repo.login(String.valueOf(a.get("email")), String.valueOf(a.get("senha")));
        if (u == null)
            throw new RuntimeException("Email ou senha inválidos. Verifique suas credenciais e tente novamente.");
        return jwt.generateToken(((Number) u.get("id")).intValue(), "ADMIN");
    }
}
