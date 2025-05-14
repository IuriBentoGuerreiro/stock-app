import { SaleItemRequest } from "./SaleItemRequest";

export class SaleRequest {
    clientName: string;
    saleItems: SaleItemRequest[];

    constructor(clientName: string, saleItems: SaleItemRequest[]) {
        this.clientName = clientName;
        this.saleItems = saleItems;
    }
}