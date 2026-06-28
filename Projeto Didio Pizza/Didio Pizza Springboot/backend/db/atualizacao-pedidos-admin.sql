-- Rode este arquivo se seu banco ainda não tiver a coluna observacao em pedido_item.
ALTER TABLE pedido_item ADD COLUMN observacao VARCHAR(255);
