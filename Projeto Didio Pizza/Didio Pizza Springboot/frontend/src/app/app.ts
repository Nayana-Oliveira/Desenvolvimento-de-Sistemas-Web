import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  mostrarHeader = true;
  mostrarFooter = true;

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const rota = this.router.url;
      const telaLoginCadastro = rota === '/login' || rota === '/cadastro';
      const telaDetalhePedido = rota.startsWith('/produto/');

      this.mostrarHeader = !telaLoginCadastro;
      this.mostrarFooter = !telaLoginCadastro && !telaDetalhePedido && rota !== '/order-details';
    });
  }
}
