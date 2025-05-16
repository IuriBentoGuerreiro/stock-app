import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { Product } from './../../core/model/Product';
import { ProductRequest } from '../../core/dtos/ProductRequest';
import { ProductService } from './../../core/services/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { ProductFilter } from '../../core/model/ProductFilter';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
     FormsModule,
     MatCardModule, 
     MatIconModule,
     PaginatorComponent,
     MatFormFieldModule
    ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productFilter: ProductFilter = {productName: ''};
  totalElements: number = 0;
  page: number = 0;
  size: number = 12;

  constructor(private dialog: MatDialog, private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
  const filter = {
    productName: this.productFilter.productName?.trim() || ''
  };

  this.productService.getAllProducts(this.page, this.size, filter).subscribe(
    (response) => {
      this.products = response.content;
      this.totalElements = response.totalElements;
    },
    (error) => {
      console.error('Erro ao buscar produtos:', error);
     }
   );
  }

  getProductById(id: number): void {
    this.productService.getProductById(id).subscribe(
      (error) => {
        console.error('Erro ao buscar produto por ID:', error);
      }
    );
  }

  saveProduct(product: ProductRequest): void {
    this.productService.saveProduct(product).subscribe({
      next: (savedProduct) => {
        console.log('Produto salvo com sucesso:', savedProduct);
        this.getAllProducts();
      },
      error: (error) => {
        console.error('Erro ao salvar produto:', error);
      }
    });
  }

  updateProduct(id: number, product: ProductRequest): void {
    this.productService.updateProduct(id, product).subscribe({
      next: (updatedProduct) => {
        console.log('Produto atualizado com sucesso:', updatedProduct);
        this.getAllProducts();
      },
      error: (error) => {
        console.error('Erro ao atualizar produto:', error);
      }
    });
  }

  deleteProduct(id?: number): void {
    if (!id) {
      console.error('ID do produto é indefinido');
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Produto deletado com sucesso');
        this.getAllProducts();
      },
      error: (error) => {
        console.error('Erro ao deletar produto:', error);
      }
    });
  }

  openProductModal(product?: Product): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '500px',
      data: product || { name: '', price: 0, stockQuantity: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product?.id) {
          this.updateProduct(product.id, result);
        } else {
          this.saveProduct(result);
        }
      }
    });
  }

  onPageChange(event: PageEvent): void {
    console.log('Página mudou:', event);
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.getAllProducts();
  }
}
