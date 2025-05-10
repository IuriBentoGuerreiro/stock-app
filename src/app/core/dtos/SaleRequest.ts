export class SaleRequest {
    client: string;
    quantity: number;
    totalPrice: number;
    productId: number;

    constructor(client: string, quantity: number, totalPrice: number, productId: number) {
        this.client = client;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.productId = productId;
    }
}