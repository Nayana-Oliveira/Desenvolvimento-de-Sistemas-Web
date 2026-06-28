-- Rode este arquivo apenas se o seu banco já existia antes do status FINALIZADO.
ALTER TABLE pedido
MODIFY status ENUM('REGISTRADO','PREPARANDO','EM_ROTA','ENTREGUE','FINALIZADO') NOT NULL;

ALTER TABLE pedido_status_historico
MODIFY status ENUM('REGISTRADO','PREPARANDO','EM_ROTA','ENTREGUE','FINALIZADO') NOT NULL;
