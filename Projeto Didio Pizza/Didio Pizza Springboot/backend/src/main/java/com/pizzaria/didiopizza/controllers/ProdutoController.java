package com.pizzaria.didiopizza.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pizzaria.didiopizza.security.JwtUtil;
import com.pizzaria.didiopizza.service.ProdutoService;

@RestController
public class ProdutoController {
    private final ProdutoService service;
    private final JwtUtil jwt;
    @Value("${app.upload.produto}")
    private String uploadDir;

    public ProdutoController(ProdutoService s, JwtUtil j) {
        service = s;
        jwt = j;
    }

    @PostMapping(value = "/produto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> criar(
            @RequestHeader("Authorization") String a,
            @RequestParam Map<String, Object> body,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem) throws Exception {
        jwt.onlyAdmin(a);
        if (imagem == null || imagem.isEmpty())
            throw new RuntimeException("Nenhuma foto enviada. Por favor, selecione uma foto para upload.");
        String caminho = salvarArquivo(imagem);
            body.put("imagem", caminho);
        return ResponseEntity.status(201).body(Map.of("id", service.salvarProduto(body)));
    }

    @GetMapping("/produto")
    public List<Map<String, Object>> listar() {
        return service.listarProduto();
    }

    @GetMapping("/produto/{id}")
    public ResponseEntity<?> buscar(
            @PathVariable Integer id) {
        var p = service.buscarProdutoPorId(id);
        return p == null ? ResponseEntity.status(404).body(Map.of("erro", "Produto não encontrado."))
                : ResponseEntity.ok(p);
    }

    @PutMapping("/produto/{id}")
    public Object atualizar(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id,
            @RequestBody Map<String, Object> b) {
        jwt.onlyAdmin(a);
        int linhas = service.alterarProduto(id, b);
        if (linhas == 0)
            throw new RuntimeException("Produto não encontrado.");
        return linhas;
    }

    @DeleteMapping("/produto/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void del(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id) {
        jwt.onlyAdmin(a);
        if (service.deletarProduto(id) == 0)
            throw new RuntimeException("Produto não encontrado.");
    }

    @PutMapping(value = "/produto/{id}/imagem", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void foto(
            @RequestHeader("Authorization") String a,
            @PathVariable Integer id,
            @RequestParam(value = "imagem", required = false) MultipartFile imagem) throws Exception {
        jwt.onlyAdmin(a);
        if (imagem == null || imagem.isEmpty())
            throw new RuntimeException("Nenhuma imagem enviada. Por favor, selecione uma foto para upload.");
        if (service.atualizarFotoPizza(id, salvarArquivo(imagem)) == 0)
            throw new RuntimeException("Produto não encontrada");
    }

    private String salvarArquivo(MultipartFile f) throws Exception {
        Files.createDirectories(Path.of(uploadDir));
        String nome = System.currentTimeMillis() + "-"
                + Objects.requireNonNull(f.getOriginalFilename()).replaceAll("\\s+", "-");
        Path destino = Path.of(uploadDir, nome);
        Files.copy(f.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);
        return destino.toString().replace("\\", "/");
    }
}
