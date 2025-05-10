export class SaleRequest {
    client: string;
    quantity: number;
    idProduct: number;

    constructor(client: string, quantity: number, idProduct: number) {
        this.client = client;
        this.quantity = quantity;
        this.idProduct = idProduct;
    }
}