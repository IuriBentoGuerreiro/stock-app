import { MatInputModule } from '@angular/material/input';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/model/Product';


@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    MatIconModule, 
    CommonModule, 
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent {
  product: Product;

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.product = { ...data };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.product);
  }

  formatPriceInput(event: any) {
    const value = event.target.value;
    
    this.product.price = parseFloat(value.replace('R$', '').replace(',', '.'));
  }
}
