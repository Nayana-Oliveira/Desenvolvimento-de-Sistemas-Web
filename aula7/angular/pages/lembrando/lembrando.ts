import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lembrando',
  standalone: true, 
  imports: [RouterLink, FormsModule], 
  templateUrl: './lembrando.html',
  styleUrl: './lembrando.css',
})

export class Lembrando {
  contador = 0;
  titulo = 'Página lembrando!';
  n1 = 0;
  n2 = 0;
  resultado = 0;

  alterarTitulo () {
    if (this.titulo == 'Página lembrando (alterada)!') {
      this.titulo = 'Página lembrando!';
    } else {
      this.titulo = 'Página lembrando (alterada)!';
    }
  }

  aumentar() {
    if (this.contador < 10) {
      this.contador++;
    }
  }

  diminuir() {
    if (this.contador > 0) {
      this.contador--;
    }
  }

  somar() {
    this.resultado = Number(this.n1) + Number(this.n2);
  }
  
  subtrair() {
    this.resultado = Number(this.n1) - Number(this.n2);
  }

  multiplicar() {
    this.resultado = Number(this.n1) * Number(this.n2);
  }

  dividir() {
    this.resultado = Number(this.n1) / Number(this.n2);
  }
}