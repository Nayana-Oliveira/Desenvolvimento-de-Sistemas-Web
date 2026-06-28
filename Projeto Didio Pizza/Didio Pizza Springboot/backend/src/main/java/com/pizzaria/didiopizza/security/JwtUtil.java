package com.pizzaria.didiopizza.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    @Value("${jwt.key}")
    private String key;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(Integer id, String tipo) {
        long umDia = 24L * 60 * 60 * 1000;
        return Jwts.builder().claims(Map.of("id", id, "tipo", tipo))
                .expiration(new Date(System.currentTimeMillis() + umDia)).signWith(getKey()).compact();
    }

    public Claims validate(String authorization) {
        if (authorization == null || authorization.isBlank())
            throw new RuntimeException("Token não informado");
        String token = authorization.replace("Bearer ", "");
        try {
            return Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload();
        } catch (Exception e) {
            throw new RuntimeException("Token inválido");
        }
    }

    public Integer getId(String authorization) {
        return ((Number) validate(authorization).get("id")).intValue();
    }

    public String getTipo(String authorization) {
        return String.valueOf(validate(authorization).get("tipo"));
    }

    public void onlyAdmin(String authorization) {
        String tipo = getTipo(authorization);
        if (!isAdminTipo(tipo))
            throw new RuntimeException("Acesso negado");
    }

    public boolean isAdminTipo(String tipo) {
        if (tipo == null) return false;
        String t = tipo.trim().toUpperCase();
        return t.equals("ADMIN") || t.equals("ROLE_ADMIN") || t.equals("ADMINISTRADOR");
    }
}
