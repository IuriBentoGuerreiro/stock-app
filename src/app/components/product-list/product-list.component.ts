import { Component } from '@angular/core';
import { SaleModalComponent } from '../sale-modal/sale-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../core/services/product.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../core/model/Product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule
  ]
})
export class ProductListComponent {
  selectedProduct: Product | null = null;

  products: Product[] = [];

  constructor(private dialog: MatDialog, private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  openSaleModal(product: any): void {
    const dialogRef = this.dialog.open(SaleModalComponent, {
      data: { product },
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Venda fechada', result);
      if (result === true) {
        this.loadProducts();
      }
    });
  }
}
