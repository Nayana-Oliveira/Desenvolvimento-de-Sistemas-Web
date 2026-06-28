import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { IngredienteService } from '../../services/ingrediente';
import { LojaService } from '../../services/loja';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit, OnDestroy {
  ingredientes: any[] = [];

  carregandoPedidos = false;

  pedidos: any[] = [];

  pedidoSelecionado: any = null;

  statusPedidos = [
    { valor: 'PREPARANDO', texto: 'Preparando', icone: '🍕' },
    { valor: 'EM_ROTA', texto: 'Em rota', icone: '🛵' },
    { valor: 'ENTREGUE', texto: 'Entregue', icone: '✅' },
    { valor: 'FINALIZADO', texto: 'Finalizado', icone: '🏁' },
  ];

  lojaAberta = false;

  faturamento = 0;

  private intervaloPedidos?: any;
  private intervaloLoja?: any;

  constructor(
    private ingredienteService: IngredienteService,
    private lojaService: LojaService,
    private pedidoService: PedidoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.validarAdmin();

    this.carregarIngredientes();

    this.carregarPedidos();

    this.buscarStatusLoja();

    this.intervaloPedidos = setInterval(() => this.carregarPedidos(), 5000);
    this.intervaloLoja = setInterval(() => this.buscarStatusLoja(), 10000);
  }

  ngOnDestroy(): void {
    if (this.intervaloPedidos) {
      clearInterval(this.intervaloPedidos);
    }

    if (this.intervaloLoja) {
      clearInterval(this.intervaloLoja);
    }
  }

  validarAdmin() {
    const token = localStorage.getItem('token');
    const tipoUsuario = localStorage.getItem('tipo_usuario');
    const tipoToken = this.tipoDoToken(token);

    if (!token || tipoUsuario !== 'admin' || !tipoToken.includes('admin')) {
      this.encerrarSessaoAdminInvalida();
    }
  }

  private tipoDoToken(token: string | null): string {
    try {
      if (!token) return '';
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      return String(payload?.tipo || '').toLowerCase();
    } catch {
      return '';
    }
  }

  private encerrarSessaoAdminInvalida() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('usuario_nome');
    localStorage.removeItem('clienteLogado');
    this.router.navigate(['/login']);
  }

  private tratarErroAdmin(err: any, contexto: string) {
    console.error(contexto, err);

    if (err?.status === 401 || err?.status === 403) {
      alert('Sua sessão de admin expirou ou está com token de cliente. Faça login novamente como admin.');
      this.encerrarSessaoAdminInvalida();
    }
  }

  carregarIngredientes() {
    this.ingredienteService.listar().subscribe({
      next: (res: any) => {
        this.ingredientes = Array.isArray(res) ? res : [];
      },

      error: (err: any) => {
        this.tratarErroAdmin(err, 'Erro ao carregar estoque:');
        this.ingredientes = [];
      },
    });
  }

  carregarPedidos() {
    this.carregandoPedidos = true;

    this.pedidoService.listarAdmin().subscribe({
      next: (res: any) => {
        this.pedidos = Array.isArray(res) ? res : [];
        this.calcularFaturamentoHoje();
        this.carregandoPedidos = false;

        if (this.pedidoSelecionado) {
          const atualizado = this.pedidos.find((p) => p.id === this.pedidoSelecionado.id);
          if (atualizado) {
            this.pedidoSelecionado = atualizado;
          }
        }
      },

      error: (err: any) => {
        this.tratarErroAdmin(err, 'Erro ao carregar pedidos do admin:');
        this.pedidos = [];
        this.faturamento = 0;
        this.carregandoPedidos = false;
      },
    });
  }

  buscarStatusLoja() {
    this.lojaService.status().subscribe({
      next: (res: any) => {
        this.lojaAberta = this.converterBoolean(res?.aberta);
      },

      error: (err: any) => {
        console.error(err);
      },
    });
  }

  abrirLoja() {
    if (this.lojaAberta) {
      return;
    }

    this.lojaService.abrir().subscribe({
      next: () => {
        this.buscarStatusLoja();
        alert('Loja aberta com sucesso!');
      },
      error: (err: any) => {
        console.error(err);
        alert('Não foi possível abrir a loja. Tente novamente.');
      },
    });
  }

  fecharLoja() {
    if (!this.lojaAberta) {
      return;
    }

    this.lojaService.fechar().subscribe({
      next: () => {
        this.buscarStatusLoja();
        alert('Loja fechada com sucesso!');
      },
      error: (err: any) => {
        console.error(err);
        alert('Não foi possível fechar a loja. Tente novamente.');
      },
    });
  }

  abrirModalPedido(pedido: any) {
    this.pedidoSelecionado = pedido;
  }

  fecharModalPedido() {
    this.pedidoSelecionado = null;
  }

  atualizarStatusPedido(pedido: any, status: string) {
    const statusAnterior = pedido.status;
    pedido.status = status;

    this.pedidoService.atualizarStatus(pedido.id, status).subscribe({
      next: () => {
        this.carregarPedidos();
      },
      error: (err: any) => {
        console.error(err);
        pedido.status = statusAnterior;
        alert('Não foi possível atualizar o status do pedido.');
      },
    });
  }

  getIcone(nome: string) {
    const icons: any = {
      Mussarela: '🧀',
      Calabresa: '🍖',
      Pepperoni: '🍕',
      Molho: '🍅',
      Cebola: '🧅',
      Farinha: '🌾',
      Refrigerante: '🥤',
      Bacon: '🥓',
      Chocolate: '🍫',
      Frango: '🍗',
    };

    return icons[nome] || '📦';
  }

  iconeStatus(status: string) {
    const icons: any = {
      REGISTRADO: '🧾',
      PREPARANDO: '🍕',
      EM_ROTA: '🛵',
      ENTREGUE: '✅',
      FINALIZADO: '🏁',
    };

    return icons[status] || '🧾';
  }

  formatarStatus(status: string) {
    return String(status || '').replace(/_/g, ' ').toLowerCase();
  }

  isPedidoHoje(pedido: any) {
    const dataPedido = this.extrairDataPedido(pedido);

    if (!dataPedido) {
      return false;
    }

    const hoje = new Date();

    return (
      dataPedido.getFullYear() === hoje.getFullYear() &&
      dataPedido.getMonth() === hoje.getMonth() &&
      dataPedido.getDate() === hoje.getDate()
    );
  }

  calcularFaturamentoHoje() {
    this.faturamento = this.pedidos
      .filter((pedido: any) => this.isPedidoHoje(pedido))
      .reduce((total: number, pedido: any) => {
        return total + Number(pedido.total || pedido.valorTotal || 0);
      }, 0);
  }

  get pedidosHoje() {
    return this.pedidos.filter((pedido) => this.isPedidoHoje(pedido));
  }

  get pedidosAtivos() {
    return this.pedidos.filter((pedido) => !['ENTREGUE', 'FINALIZADO'].includes(pedido.status));
  }

  get vendasHojeFormatado() {
    return this.formatarMoeda(this.faturamento);
  }

  formatarMoeda(valor: any) {
    return Number(valor || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  totalItem(item: any) {
    return Number(item?.preco || 0) * Number(item?.quantidade || 1);
  }


  private extrairDataPedido(pedido: any): Date | null {
    const valor = pedido.data || pedido.createdAt || pedido.criadoEm || pedido.dataPedido;

    if (!valor) {
      return null;
    }

    if (Array.isArray(valor)) {
      const [ano, mes, dia, hora = 0, minuto = 0, segundo = 0] = valor;
      return new Date(Number(ano), Number(mes) - 1, Number(dia), Number(hora), Number(minuto), Number(segundo));
    }

    if (typeof valor === 'string') {
      const texto = valor.includes('T') ? valor : valor.replace(' ', 'T');
      const data = new Date(texto);
      return Number.isNaN(data.getTime()) ? null : data;
    }

    const data = new Date(valor);
    return Number.isNaN(data.getTime()) ? null : data;
  }

  private converterBoolean(valor: any) {
    return valor === true || valor === 1 || valor === '1' || String(valor).toLowerCase() === 'true';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tipo_usuario');

    this.router.navigate(['/login']);
  }

  get estoqueBaixo() {
    return this.ingredientes.filter((item) => item.quantidade <= 10);
  }
}
