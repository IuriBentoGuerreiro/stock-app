import { Product } from "../model/Product";

export class SaleResponse {
        id?: number;
        client: string;
        quantity: number;
        totalPrice: number;
        product: Product;
    
        constructor(id: number, client: string, quantity: number, totalPrice: number, product: Product) {
            this.id = id;
            this.client = client;
            this.quantity = quantity;
            this.totalPrice = totalPrice;
            this.product = product;
        }
    
}