package com.pizzaria.didiopizza.models.response;

import java.util.List;
import java.util.Map;

public class PedidoDetalheResponse {
    public Integer id;
    public Object data;
    public String status;
    public Double total;
    public List<Map<String, Object>> itens;
}
