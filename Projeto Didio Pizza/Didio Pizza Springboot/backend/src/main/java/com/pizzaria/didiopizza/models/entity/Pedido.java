package com.pizzaria.didiopizza.models.entity;

import java.time.LocalDateTime;

public class Pedido {
    public Integer id;
    public Integer clienteId;
    public Integer enderecoId;
    public LocalDateTime data;
    public String status;
    public Double total;
}
