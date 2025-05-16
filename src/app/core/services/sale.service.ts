import { Sale } from './../model/Sale';
import { SaleFilter } from './../dtos/SaleFilter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleRequest } from '../dtos/SaleRequest';
import { SaleResponse } from '../dtos/SaleResponse';
import { Observable } from 'rxjs';
import { Pageable } from '../model/Pageable';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
private baseUrl = 'http://localhost:8082/sales';

  constructor(private http: HttpClient) { }

  saveSale(sale: SaleRequest): Observable<SaleResponse> {
    return this.http.post<SaleResponse>(`${this.baseUrl}`, sale);
  }

getAllSales(page: number, size: number, saleFilter: SaleFilter): Observable<Pageable<SaleResponse>> {
  let httpParams = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  if (saleFilter.clientName) {
    httpParams = httpParams.set('clientName', saleFilter.clientName);
  }

  if (saleFilter.startDate) {
    httpParams = httpParams.set('startDate', saleFilter.startDate);
  }

  if (saleFilter.endDate) {
    httpParams = httpParams.set('endDate', saleFilter.endDate);
  }

  return this.http.get<Pageable<SaleResponse>>(`${this.baseUrl}`, { params: httpParams });
}
  
  getSaleById(id: number): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`${this.baseUrl}/${id}`);
  }
}
