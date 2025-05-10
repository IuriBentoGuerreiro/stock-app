export class ProductResponse {
    id?: number;
    name: string;
    stockQuantity: number;
    price: number;

    constructor(id: number, name: string, stockQuantity: number, price: number) {
        this.id = id;
        this.name = name;
        this.stockQuantity = stockQuantity;
        this.price = price;
    }
}