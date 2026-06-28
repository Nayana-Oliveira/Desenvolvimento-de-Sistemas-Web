import { Component, OnInit } from '@angular/core';
import { Jogo } from '../../services/jogo';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consulta-jogo.html',
  styleUrl: './consulta-jogo.css'
})
export class ConsultaJogo implements OnInit {

  jogos: any[] = [];

  constructor(private service: Jogo, private router: Router) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe((resp: any) => {
      this.jogos = resp;
    });
  }

  deletar(id: number) {
    if (confirm('Deseja excluir?')) {
      this.service.deletar(id).subscribe(() => this.listar());
    }
  }

  editar(id: number) {
    this.router.navigate(['/cadastro-jogo', id]);
  }
}