import { Component, OnInit } from '@angular/core';
import { Time } from '../../services/time';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consulta-time.html',
  styleUrl: './consulta-time.css'
})
export class ConsultaTime implements OnInit {

  times: any[] = [];

  constructor(private service: Time, private router: Router) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe((resp: any) => {
      this.times = resp;
    });
  }

  deletar(id: number) {
    if (confirm('Deseja excluir?')) {
      this.service.deletar(id).subscribe(() => this.listar());
    }
  }

  editar(id: number) {
    this.router.navigate(['/cadastro-time', id]);
  }
}