import { Product } from "./Product";
import { Sale } from "./Sale";

export class SaleItem {
    id: number;
    quantity: number;
    sale: Sale;
    product: Product;

    constructor(id: number, sale: Sale, quantity: number, product: Product) {
        this.id = id;
        this.sale = sale;
        this.quantity = quantity;
        this.product = product;
    }
}