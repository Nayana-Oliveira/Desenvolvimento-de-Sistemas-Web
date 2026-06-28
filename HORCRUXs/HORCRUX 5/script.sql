
CREATE DATABASE clube_futebol;
USE clube_futebol;

-- =====================================================
-- API 1 - JOGADORES
-- =====================================================

CREATE TABLE posicao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE jogador (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT,
    nacionalidade VARCHAR(50),
    numero_camisa INT,
    posicao_id BIGINT,
    
    FOREIGN KEY (posicao_id)
    REFERENCES posicao(id)
);

CREATE TABLE contrato (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    salario DECIMAL(10,2),
    data_inicio DATE,
    data_fim DATE,
    jogador_id BIGINT UNIQUE,
    
    FOREIGN KEY (jogador_id)
    REFERENCES jogador(id)
);

CREATE TABLE usuario_jogadores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    role VARCHAR(50)
);

-- =====================================================
-- API 2 - FINANCEIRO
-- =====================================================

CREATE TABLE patrocinador (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    empresa VARCHAR(100),
    telefone VARCHAR(20)
);

CREATE TABLE receita (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(150),
    valor DECIMAL(10,2),
    data_receita DATE,
    patrocinador_id BIGINT,
    
    FOREIGN KEY (patrocinador_id)
    REFERENCES patrocinador(id)
);

CREATE TABLE despesa (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(150),
    valor DECIMAL(10,2),
    data_despesa DATE
);

CREATE TABLE usuario_financeiro (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    role VARCHAR(50)
);

-- =====================================================
-- API 3 - TREINAMENTOS
-- =====================================================

CREATE TABLE categoria_treinamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);

CREATE TABLE treinamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(150),
    data_treinamento DATE,
    horario TIME,
    categoria_id BIGINT,
    
    FOREIGN KEY (categoria_id)
    REFERENCES categoria_treinamento(id)
);

CREATE TABLE presenca (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_jogador VARCHAR(100),
    presente BOOLEAN,
    treinamento_id BIGINT,
    
    FOREIGN KEY (treinamento_id)
    REFERENCES treinamento(id)
);

CREATE TABLE usuario_treinamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    role VARCHAR(50)
);

-- =====================================================
-- API 4 - INGRESSOS
-- =====================================================

CREATE TABLE partida (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    adversario VARCHAR(100),
    data_partida DATE,
    horario TIME,
    local_partida VARCHAR(100)
);

CREATE TABLE setor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    capacidade INT
);

CREATE TABLE ingresso (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    preco DECIMAL(10,2),
    status_ingresso VARCHAR(50),
    partida_id BIGINT,
    setor_id BIGINT,
    
    FOREIGN KEY (partida_id)
    REFERENCES partida(id),
    
    FOREIGN KEY (setor_id)
    REFERENCES setor(id)
);

CREATE TABLE usuario_ingressos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    role VARCHAR(50)
);

-- =====================================================
-- API 5 - PATRIMÔNIO / ESTÁDIO
-- =====================================================

CREATE TABLE setor_estadio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    localizacao VARCHAR(100)
);

CREATE TABLE equipamento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    tipo VARCHAR(100),
    setor_id BIGINT,
    
    FOREIGN KEY (setor_id)
    REFERENCES setor_estadio(id)
);

CREATE TABLE manutencao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(150),
    data_manutencao DATE,
    equipamento_id BIGINT,
    
    FOREIGN KEY (equipamento_id)
    REFERENCES equipamento(id)
);

CREATE TABLE usuario_patrimonio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    role VARCHAR(50)
);