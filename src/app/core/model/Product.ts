export class Product{
    id?: number;
    name: string;
    description: string;
    stockQuantity: number;
    price: number;
    isActive: boolean;

    constructor(id: number, name: string, description: string, stockQuantity: number, price: number, isActive: boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stockQuantity = stockQuantity;
        this.price = price;
        this.isActive = isActive;
    }
}