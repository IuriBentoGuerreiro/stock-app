import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { SaleRequest } from '../../core/dtos/SaleRequest';
import { SaleService } from '../../core/services/sale.service';
import { ProductService } from '../../core/services/product.service';
import { SaleResponse } from '../../core/dtos/SaleResponse';
import { Sale } from '../../core/model/Sale';
import { Product } from '../../core/model/Product';
import { SaleItemRequest } from '../../core/dtos/SaleItemRequest';
import { PageEvent } from '@angular/material/paginator';
import { ProductFilter } from '../../core/model/ProductFilter';

@Component({
  selector: 'app-sale-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule
  ],
  templateUrl: './sale-item-modal.component.html',
  styleUrls: ['./sale-item-modal.component.scss']
})
export class SaleItemModalComponent implements OnInit {
  @ViewChild('productSelect') productSelect!: MatSelect;

  products: Product[] = [];
  productFilter: ProductFilter = { productName: '' };
  isSelectOpened = false;

  saleRequest: SaleRequest = { clientName: '', saleItems: [] };
  currentItem: SaleItemRequest = { productId: 0, quantity: 1 };
  saleResponse?: SaleResponse;
  sales: Sale[] = [];
  totalElements = 0;
  page = 0;
  size = 12;

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<SaleItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSales();
  }

  loadSales(): void {
    this.saleService.getAllSales(this.page, this.size).subscribe({
      next: (response) => {
        this.sales = response.content;
        this.totalElements = response.totalElements;
      },
      error: (error) => {
        console.error('Erro ao buscar vendas:', error);
      }
    });
  }

  private loadProducts(): void {
    this.productService.getAllProducts(0, 100, this.productFilter).subscribe({
      next: (response) => {
        this.products = response.content;
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    });
  }

  addItem(): void {
    const product = this.products.find(p => p.id === this.currentItem.productId);
    if (product && this.currentItem.quantity > 0) {
      this.saleRequest.saleItems.push({ ...this.currentItem });
      this.currentItem = { productId: 0, quantity: 1 };
      this.productFilter.productName = '';
      this.productSelect.close();
    }
  }

  removeItem(index: number): void {
    this.saleRequest.saleItems.splice(index, 1);
  }

  getTotal(): number {
    return this.saleRequest.saleItems.reduce((total, item) => {
      const product = this.products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  onSave(): void {
    if (!this.saleRequest.clientName || this.saleRequest.saleItems.length === 0) {
      alert('Preencha o nome do cliente e adicione pelo menos um produto.');
      return;
    }

    this.saleService.saveSale(this.saleRequest).subscribe({
      next: (response) => {
        this.loadSales();
        this.dialogRef.close(response);
      },
      error: () => {
        alert('Erro ao salvar venda.');
      }
    });
  }

  getProductById(productId: number): Product | undefined {
    return this.products.find(p => p.id === productId);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadSales();
  }

  get filteredProducts(): Product[] {
    const search = this.productFilter.productName?.toLowerCase() || '';
    return this.products.filter(product =>
      product.name.toLowerCase().includes(search)
    );
  }

  onProductSelectOpened(opened: boolean): void {
    this.isSelectOpened = opened;
    if (opened) {
      this.productFilter.productName = '';
    }
  }

  onSearchChange(select: MatSelect): void {
    if (!this.isSelectOpened) {
      setTimeout(() => select.open());
    }
  }
}
