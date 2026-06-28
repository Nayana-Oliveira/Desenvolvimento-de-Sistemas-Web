import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Time } from '../../services/time';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './cadastro-time.html',
  styleUrl: './cadastro-time.css'
})
export class CadastroTime implements OnInit {

  time: any = {};
  id: number = 0;

  data: string = '';

  constructor(
    private service: Time,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    this.id = param ? Number(param) : 0;

    if (this.id) {
      this.service.buscarPorId(this.id).subscribe((resp: any) => {
        this.time = resp;

        if (this.time.data_fundacao) {
          this.data = this.time.data_fundacao.slice(0, 10);
        }
      });
    }
  }

  salvar() {

    if (this.time.sigla.length !== 3)
      return alert('Sigla inválida');

    if (this.time.qtd_copas < 0)
      return alert('Copas inválidas');

    if (this.time.ranking_fifa <= 0)
      return alert('Ranking inválido');

    if (!this.data)
      return alert('Data obrigatória');

    this.time.data_fundacao = this.data;

    if (this.id) {
      this.service.atualizar(this.id, this.time).subscribe(() => {
        alert('Atualizado!');
      });
    } else {
      this.service.cadastrar(this.time).subscribe(() => {
        alert('Cadastrado!');
        this.time = {};
        this.data = '';
      });
    }
  }
}