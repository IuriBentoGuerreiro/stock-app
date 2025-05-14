import { Product } from "../model/Product";
import { Sale } from "../model/Sale";

export class SaleItemResponse {
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