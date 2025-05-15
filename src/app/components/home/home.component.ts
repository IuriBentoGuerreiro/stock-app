import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  features = [
    {
      icon: 'inventory_2',
      title: 'Gestão de Produtos',
      description: 'Cadastre, edite e visualize todos os seus produtos com facilidade.'
    },
    {
      icon: 'shopping_cart_checkout',
      title: 'Registro de Vendas',
      description: 'Monte vendas com múltiplos itens e associe ao nome do cliente.'
    },
    {
      icon: 'history',
      title: 'Histórico Detalhado',
      description: 'Acompanhe as vendas, valores e datas.'
    },
    {
      icon: 'search',
      title: 'Busca Rápida',
      description: 'Filtre produtos em tempo real e agilize o processo de venda.'
    }
  ];
}
