import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Product } from '../../models/main-models/product';
import { ResponseModel } from '../../models/core-models/response';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch Products list
  getProducts(id: string): Observable<Product[]> {
    return this.http
      .get<ResponseModel>('/api/Product/GetListProductMulti/' + id)
      .pipe(
        map((res) => res.Data),
        catchError(this.handleError)
      );
  }

  // HttpClient API get() method => Fetch Product
  getProduct(id: string): Observable<Product> {
    return this.http
      .get<Product>('/api/Product/GetProductByID/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch Product
  getProductAll(): Observable<Product[]> {
    return this.http
      .get<ResponseModel>('/api/Product/GetListProductAll/')
      .pipe(
        map((res) => res.Data),
        catchError(this.handleError)
      );
  }

  // HttpClient API post() method => Create Product
  addOrUpdateProduct(product: any): Observable<Product> {
    return this.http
      .post<Product>(
        '/api/Product/AddOrUpdateProduct',
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Product
  deleteProduct(ids: any) {
    return this.http
      .post<ResponseModel>(
        '/api/Product/DeleteProduct/',
        JSON.stringify(ids),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  checkTotalProduct(): Observable<ResponseModel> {
    return this.http
      .get<ResponseModel>('/api/Product/CheckTotalProduct')
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status} \nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
