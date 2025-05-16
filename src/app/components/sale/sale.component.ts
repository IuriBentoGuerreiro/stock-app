import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Product } from '../../core/model/Product';
import { Sale } from '../../core/model/Sale';
import { SaleRequest } from '../../core/dtos/SaleRequest';
import { SaleItemRequest } from '../../core/dtos/SaleItemRequest';

import { ProductService } from '../../core/services/product.service';
import { SaleService } from '../../core/services/sale.service';

import { SaleItemsFormatPipe } from '../../shared/pipes/sale-items-format.pipe';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { SaleItemModalComponent } from '../sale-item-modal/sale-item-modal.component';
import { ProductFilter } from '../../core/model/ProductFilter';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [CommonModule, MatIconModule, SaleItemsFormatPipe, PaginatorComponent],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent implements OnInit {
  displayedColumns = ['id', 'date', 'items', 'total'];
  sales: Sale[] = [];

  products: Product[] = [];
  filteredProducts: Product[] = [];

  saleItems: (Product & { quantity: number })[] = [];

  clientName = '';
  searchTerm = '';
  productFilter: ProductFilter = {productName: ''};
  

  modalOpen = false;

  totalElements = 0;
  page = 0;
  size = 12;

  total = 0;

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSales();
  }

  loadProducts(): void {
    this.productService.getAllProducts(0, 100, this.productFilter).subscribe({
      next: res => {
        this.products = res.content;
        console.log('Produtos carregados:', res);
      },
      error: err => console.error('Erro ao carregar produtos:', err)
    });
  }

  loadSales(): void {
    this.saleService.getAllSales(this.page, this.size).subscribe({
      next: response => {
        this.sales = response.content;
        this.totalElements = response.totalElements;
      },
      error: err => console.error('Erro ao buscar vendas:', err)
    });
  }

  onSearch(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  addProduct(product: Product): void {
    const item = this.saleItems.find(p => p.id === product.id);
    item ? item.quantity++ : this.saleItems.push({ ...product, quantity: 1 });

    this.searchTerm = '';
    this.filteredProducts = [];
    this.updateTotal();
  }

  removeItem(index: number): void {
    this.saleItems.splice(index, 1);
    this.updateTotal();
  }

  updateTotal(): void {
    this.total = this.saleItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  finalizeSale(): void {
    if (this.saleItems.length === 0) {
      alert('Por favor, adicione itens à venda.');
      return;
    }

    const saleItems = this.toSaleItemRequestArray();

    if (saleItems.length === 0) {
      alert('Todos os itens da venda são inválidos.');
      return;
    }

    const saleRequest = new SaleRequest(this.clientName, saleItems);

    this.saleService.saveSale(saleRequest).subscribe({
      next: () => {
        alert('Venda registrada com sucesso!');
        this.closeModal();
        this.loadSales();
      },
      error: err => {
        console.error('Erro ao registrar venda:', err);
        alert('Falha ao registrar venda.');
      }
    });
  }

  private toSaleItemRequestArray(): SaleItemRequest[] {
    return this.saleItems
      .map(item => {
        if (!item.id || item.quantity <= 0) return null;
        return new SaleItemRequest(item.id, item.quantity);
      })
      .filter((item): item is SaleItemRequest => item !== null);
  }

  openSaleModal(product?: Product): void {
  const dialogRef = this.dialog.open(SaleItemModalComponent, {
    width: '500px',
    data: {
      clientName: this.clientName || 'Cliente Desconhecido',
      sale: product
        ? new SaleItemRequest(product.id!, 1)
        : null
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Modal fechado com:', result);
      this.loadSales();
    }
  });
}


  onPageChange(event: PageEvent): void {
      console.log('Página mudou:', event);
      this.page = event.pageIndex;
      this.size = event.pageSize;
      this.loadSales();
    }
}
