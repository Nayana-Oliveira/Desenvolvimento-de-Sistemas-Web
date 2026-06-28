# Didio Pizza

Sistema web completo para gerenciamento e realização de pedidos de pizzaria, desenvolvido com Angular, Spring Boot e MySQL.

O sistema possui área de clientes e administradores, permitindo gerenciamento de pedidos em tempo real, controle de estoque, acompanhamento do status dos pedidos e dashboard administrativo.

---

## Funcionalidades

### Cliente
- Cadastro e login
- Visualização do cardápio
- Página de detalhes do produto
- Personalização do pedido:
  - borda recheada
  - tamanho
  - adicionais
- Carrinho lateral
- Finalização de pedidos
- Histórico dos últimos pedidos
- Repetir pedido
- Acompanhamento do status:
  - Preparando
  - Em rota
  - Entregue
  - Finalizado
- Recomendações na página inicial

---

### Administrador
- Login administrativo
- Dashboard em tempo real
- Controle de abertura/fechamento da loja
- Gestão de estoque
- Cadastro e edição de pizzas
- Cadastro com preços por tamanho:
  - P
  - M
  - G
- Visualização de pedidos em tempo real
- Modal detalhado dos pedidos
- Alteração do status:
  - Preparando
  - Em rota
  - Entregue
  - Finalizado
- Indicadores:
  - pedidos realizados
  - vendas do dia
  - estoque

---

## Tecnologias utilizadas

### Frontend
- Angular
- TypeScript
- HTML
- CSS

### Backend
- Spring Boot
- Java
- Spring Security
- JWT

### Banco de Dados
- MySQL

---

## Estrutura do projeto

```txt
DidioPizza/
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── assets/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── security/
│   └── config/
│
└── database/
````

## Como executar

### Backend

Entre na pasta:

```bash
cd backend
```

Configure o arquivo:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pizzaria_db
spring.datasource.username=root
spring.datasource.password=suasenha
```

Execute:

```bash
mvn spring-boot:run
```

Servidor:

```txt
http://localhost:5010
```

---

### Frontend

Entre na pasta:

```bash
cd frontend
```

Instale:

```bash
npm install
```

Execute:

```bash
ng serve
```

Aplicação:

```txt
http://localhost:4200
```

---

## Autenticação

O sistema utiliza JWT para autenticação.

Perfis:

* ADMIN
* CLIENTE

Rotas protegidas impedem acesso não autorizado.

---

## Funcionalidades futuras

* Notificações em tempo real
* Integração com API de pagamentos
* Chat com suporte
* Avaliações de pedidos
* Cupons de desconto
* Rastreamento do entregador

---

## Desenvolvido por

Nayana Oliveira, Guilherme Israel, Guilherme Alves, Gustavo Bordinasso e Gabriel Groppo

