import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})

export class Cadastro {

  nome = '';
  email = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  fazerCadastro() {

    if (this.senha !== this.confirmarSenha) {

      alert('As senhas não coincidem');

      return;
    }

    const cliente = {

      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha
    };

    this.authService.cadastrar(cliente)
      .subscribe({

        next: () => {

          alert('Cadastro realizado com sucesso!');

          this.router.navigate(['/login']);
        },

        error: (err: any) => {

          console.log(err.error.erro);

          alert(err.error.erro);
        }
      });
  }
}