import { Pipe, PipeTransform } from '@angular/core';
import { SaleItem } from '../../core/model/SaleItem';

@Pipe({
  name: 'saleItemsFormat',
  standalone: true
})
export class SaleItemsFormatPipe implements PipeTransform {
  transform(items: SaleItem[]): string {
    if (!items || items.length === 0) {
      return 'Sem itens';
    }

    return items.map(item => `${item.quantity}x ${item.product.name}`).join(', ');
  }
}
