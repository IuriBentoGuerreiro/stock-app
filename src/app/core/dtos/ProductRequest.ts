export class ProductRequest {
    name: string;
    stockQuantity: number;
    price: number;

    constructor(name: string, stockQuantity: number, price: number) {
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.price = price;
    }
}