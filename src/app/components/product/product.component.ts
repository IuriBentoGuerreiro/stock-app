import { MatDialog } from '@angular/material/dialog';
import { Product } from './../../core/model/Product';
import { CommonModule } from '@angular/common';
import { ProductRequest } from '../../core/dtos/ProductRequest';
import { ProductService } from './../../core/services/product.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIcon],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Product[] = [];

  constructor(private dialog: MatDialog, private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }  

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error fetching product by ID:', error);
      }
    );
  }

  saveProduct(product: ProductRequest): void {
    this.productService.saveProduct(product).subscribe({
      next: (savedProduct) => {
        console.log('Produto salvo com sucesso:', savedProduct);
        this.products = [...this.products, savedProduct];
      },
      error: (error) => {
        console.error('Erro ao salvar produto:', error);
      }
    });
  }

  updateProduct(id: number, product: ProductRequest) {
    this.productService.updateProduct(id, product).subscribe({
      next: (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        this.products = this.products.map(p => 
          p.id === id ? updatedProduct : p
        );
      },
      error: (error) => {
        console.error('Error updating product:', error);
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
        this.products = this.products.filter(product => product.id !== id);
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
}
