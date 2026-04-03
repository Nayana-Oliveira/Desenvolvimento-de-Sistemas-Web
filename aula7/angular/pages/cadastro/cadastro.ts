import { Component } from '@angular/core';
import { ObraService, Obra } from '../../services/obra.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  id: number | null = null;

  obra: Obra = {
    titulo: '',
    autor: '',
    editora: '',
    isbn: '',
    anoPublicacao: 0,
    estoque: 0
  };

  constructor(private service: ObraService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.service.buscarPorId(this.id).subscribe(res => {
        this.obra = res;
      });
    }
  }


  salvar() {
    if (this.id) {
      this.service.atualizar(this.id, this.obra).subscribe(() => {
        alert('Obra atualizada!');
      });
    }
    else {
      this.service.cadastrar(this.obra).subscribe(() => {
        alert('Obra cadastrada!');
        this.obra = {} as Obra;
      });
    }
  }


}