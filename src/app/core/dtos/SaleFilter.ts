export class SaleFilter{
    clientName: string;
    startDate: string;
    endDate: string;

    constructor(clientName: string, startDate: string, endDate: string){
        this.clientName = clientName;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}