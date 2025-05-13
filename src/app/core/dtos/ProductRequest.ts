export class ProductRequest {
    name: string;
    description: string;
    stockQuantity: number;
    price: number;

    constructor(name: string, description: string, stockQuantity: number, price: number) {
        this.name = name;
        this.description = description;
        this.stockQuantity = stockQuantity;
        this.price = price;
    }
}