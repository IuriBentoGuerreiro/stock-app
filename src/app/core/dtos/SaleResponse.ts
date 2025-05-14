import { Product } from "../model/Product";
import { SaleItem } from "../model/SaleItem";

export class SaleResponse {
        id?: number;
        clientName: string;
        saleDate: Date;
        totalAmount: number;
        items: SaleItem[];

        constructor(id: number, clientName: string, saleDate: Date, totalAmount: number, items: SaleItem[]) {
            this.id = id;
            this.clientName = clientName;
            this.saleDate = saleDate;
            this.totalAmount = totalAmount;
            this.items = items;
        }
    
}