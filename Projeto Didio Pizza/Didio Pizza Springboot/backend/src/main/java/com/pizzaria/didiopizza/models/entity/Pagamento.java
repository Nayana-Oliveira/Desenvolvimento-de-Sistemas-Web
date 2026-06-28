package com.pizzaria.didiopizza.models.entity;

import java.time.LocalDateTime;

public class Pagamento {
    public Integer id;
    public Integer clienteId;
    public Integer pedidoId;
    public String tipo;
    public String status;
    public Double valor;
    public LocalDateTime data;
}
