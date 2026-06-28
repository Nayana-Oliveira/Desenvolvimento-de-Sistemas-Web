CREATE DATABASE pizzaria_db;
USE pizzaria_db;


CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

SELECT * FROM admin;



CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

SELECT * FROM cliente;



CREATE TABLE endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    rua VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    complemento VARCHAR(100),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

SELECT * FROM endereco
WHERE cliente_id = 1;



CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome ENUM('RECEITAS_CLASSICAS','RECEITAS_ESPECIAIS','RECEITAS_LEVES','LINHA_VERDI','SOBREMESAS','BEBIDA','COMBO')
);

INSERT INTO categoria (nome) 
VALUES ('RECEITAS_CLASSICAS'), ('RECEITAS_ESPECIAIS'), ('RECEITAS_LEVES'), ('LINHA_VERDI'), ('SOBREMESAS'), ('BEBIDA'), ('COMBO');

SELECT * FROM categoria;



CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(1024),
    tamanho ENUM('P','M','G') NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

SELECT * FROM produto;



CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL,
    unidade ENUM('kg', 'g', 'L', 'ml', 'un') NOT NULL
);

SELECT * FROM estoque;




CREATE TABLE pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    endereco_id INT NOT NULL,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('REGISTRADO','PREPARANDO','EM_ROTA','ENTREGUE','FINALIZADO'),
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (endereco_id) REFERENCES endereco(id)
);
SELECT * FROM pedido;



CREATE TABLE pedido_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);
ALTER TABLE pedido_item ADD observacao VARCHAR(255);


SELECT * FROM pedido_item;




CREATE TABLE carrinho ( 
	id INT AUTO_INCREMENT PRIMARY KEY, 
    cliente_id INT NOT NULL, 
    ativo BOOLEAN DEFAULT TRUE NOT NULL, 
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) 
);

SELECT * FROM carrinho;



CREATE TABLE carrinho_item (
	id INT AUTO_INCREMENT PRIMARY KEY, 
    carrinho_id INT NOT NULL, 
    produto_id INT NOT NULL, 
    quantidade INT NOT NULL,
    FOREIGN KEY (carrinho_id) REFERENCES carrinho(id), 
    FOREIGN KEY (produto_id) REFERENCES produto(id) 
);
ALTER TABLE carrinho_item ADD observacao VARCHAR(255);


SELECT * FROM carrinho_item
WHERE carrinho_id = 1;




CREATE TABLE pedido_status_historico ( 
	id INT AUTO_INCREMENT PRIMARY KEY, 
    pedido_id INT NOT NULL, 
    status ENUM('REGISTRADO','PREPARANDO','EM_ROTA','ENTREGUE','FINALIZADO'),
    data DATETIME NOT NULL, 
    FOREIGN KEY (pedido_id) REFERENCES pedido(id)
);

SELECT * FROM pedido_status_historico;


CREATE TABLE pagamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    pedido_id INT NOT NULL,
    tipo ENUM('DINHEIRO','CARTAO','PIX'),
    status ENUM('PENDENTE','PAGO'),
    valor DECIMAL(10,2),
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (pedido_id) REFERENCES pedido(id)
);


SELECT * FROM pagamento;



CREATE TABLE loja (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    aberta BOOLEAN DEFAULT TRUE
);

INSERT INTO loja (nome, aberta) VALUES ('Didio Pizza', TRUE);

SELECT * FROM loja;