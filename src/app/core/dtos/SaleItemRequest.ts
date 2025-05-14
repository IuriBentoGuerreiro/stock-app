export class SaleItemRequest {
    quantity: number;
    productId: number;

    constructor(quantity: number, productId: number) {
        this.quantity = quantity;
        this.productId = productId;
    }
}