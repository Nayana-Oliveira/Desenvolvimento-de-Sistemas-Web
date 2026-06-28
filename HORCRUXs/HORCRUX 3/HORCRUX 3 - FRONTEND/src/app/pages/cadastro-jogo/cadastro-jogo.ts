import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Jogo } from '../../services/jogo';
import { Time } from '../../services/time';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro-jogo.html',
  styleUrl: './cadastro-jogo.css'
})
export class CadastroJogo implements OnInit {

  jogo: any = {};
  times: any[] = [];
  id: number = 0;

  data: string = '';
  hora: string = '';

  constructor(
    private jogoService: Jogo,
    private timeService: Time,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.timeService.listar().subscribe((resp: any) => {
      this.times = resp;
    });

    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? Number(param) : 0;

    if (this.id) {
      this.jogoService.buscarPorId(this.id).subscribe((resp: any) => {
        this.jogo = resp;

        if (this.jogo.data_jogo) {
          this.data = this.jogo.data_jogo.slice(0, 10);
          this.hora = this.jogo.data_jogo.slice(11, 16);
        }
      });
    }
  }

  salvar() {

    if (!this.jogo.id_time_mandante || !this.jogo.id_time_visitante)
      return alert('Selecione os times');

    if (this.jogo.id_time_mandante === this.jogo.id_time_visitante)
      return alert('Times não podem ser iguais');

    if (this.jogo.nr_gols_mandante < 0 || this.jogo.nr_gols_visitante < 0)
      return alert('Gols inválidos');

    if (!this.data || !this.hora)
      return alert('Data e hora obrigatórias');

    this.jogo.data_jogo = `${this.data} ${this.hora}:00`;

    if (this.id) {
      this.jogoService.atualizar(this.id, this.jogo).subscribe(() => {
        alert('Atualizado!');
      });
    } else {
      this.jogoService.cadastrar(this.jogo).subscribe(() => {
        alert('Cadastrado!');
        this.jogo = {};
        this.data = '';
        this.hora = '';
      });
    }
  }
}