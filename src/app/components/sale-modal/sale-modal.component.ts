import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { SaleRequest } from '../../core/dtos/SaleRequest';
import { Product } from '../../core/model/Product';
import { SaleService } from '../../core/services/sale.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SaleResponse } from '../../core/dtos/SaleResponse';
import { MatDividerModule } from '@angular/material/divider';

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
  templateUrl: './sale-modal.component.html',
  styleUrls: ['./sale-modal.component.scss']
})
export class SaleModalComponent {
  selectedProduct: Product;
  products: Product[] = [];

  sale: SaleRequest = {
    client: '',
    quantity: 1,
    idProduct: 0,
  };

  saleResponse: any;

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<SaleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedProduct = data.product;
    this.sale.idProduct = this.selectedProduct?.id ?? 0;
    this.getProducts();
  }

  ngOnInit(): void {
    if (this.data?.sale) {
      this.sale = { ...this.data.sale };
    }
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
  if (!this.sale.client || !this.sale.idProduct || !this.sale.quantity || this.sale.quantity < 1) {
    console.warn('Por favor, preencha todos os campos obrigatórios corretamente.');
    return;
  }

  console.log('Tentando salvar venda:', this.sale);

  this.saleService.saveSale(this.sale).subscribe({
    next: (response) => {
      console.log('Venda registrada com sucesso:', response);
      this.saleResponse = response;

    },
    error: (error) => {
      console.error('Erro ao registrar venda:', error);
    }
  });
}

  get selectedProductDetails(): Product | undefined {
    return this.products.find(p => p.id === this.sale.idProduct);
  }

  get estimatedTotal(): number {
    const product = this.selectedProductDetails;
    return product ? product.price * this.sale.quantity : 0;
  }
}
