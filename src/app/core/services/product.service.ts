import { Pageable } from '../model/Pageable';
import { ProductRequest } from './../dtos/ProductRequest';
import { ProductResponse } from './../dtos/ProductResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8082/products';


  constructor(private http: HttpClient) {}

  saveProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.baseUrl}`, product);
  }

  getAllProducts(page: number, size: number, productName: string): Observable<Pageable<ProductResponse>> {
  const httpParams = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('productName', productName);

  return this.http.get<Pageable<ProductResponse>>(`${this.baseUrl}`, { params: httpParams });
}

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: number, product: ProductRequest): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
