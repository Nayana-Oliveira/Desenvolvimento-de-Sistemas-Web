import { Component } from '@angular/core';
import { ObraService, Obra } from '../../services/obra.service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-consulta',
  imports: [RouterLink],
  templateUrl: './consulta.html',
  styleUrl: './consulta.css',
})
export class Consulta {

  obras: Obra[] = [];

  constructor(private service: ObraService, private router: Router) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.listar().subscribe(res => {
      this.obras = res;
      console.log(this.obras);
    });
  }


  editar(id: number) {
    this.router.navigate(['/cadastro', id]);
  }

  remover(id: number) {
    const confirmacao = confirm('Deseja remover esta obra?');

    if (confirmacao) {
      this.service.remover(id).subscribe(() => {
        alert('Removido com sucesso!');
        this.carregar();
      });
    }
  }

}