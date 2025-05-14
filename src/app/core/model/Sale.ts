import { Product } from "./Product";
import { SaleItem } from "./SaleItem";

export class Sale{
    id?: number;
    clientName: string;
    saleDate: Date;
    totalAmount: number;
    items: SaleItem[];

    constructor(saleDate: Date, clientName: string, totalAmount: number, items: SaleItem[]) {
        this.saleDate = saleDate;
        this.clientName = clientName;
        this.totalAmount = totalAmount;
        this.items = items;
    }
}