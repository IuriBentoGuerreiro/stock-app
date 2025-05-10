import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleRequest } from '../dtos/SaleRequest';
import { SaleResponse } from '../dtos/SaleResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
private baseUrl = 'http://localhost:8082/sales';

  constructor(private http: HttpClient) { }

  saveSale(sale: SaleRequest): Observable<SaleResponse> {
    return this.http.post<SaleResponse>(`${this.baseUrl}`, sale);
  }

  getAllSales(): Observable<SaleResponse[]> {
    return this.http.get<SaleResponse[]>(`${this.baseUrl}`);
  }
  
  getSaleById(id: number): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`${this.baseUrl}/${id}`);
  }
}
