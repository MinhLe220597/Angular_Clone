import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Order } from '../../models/main-models/order';
import { ResponseModel } from '../../models/core-models/response';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch Orders list
  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>('/api/Order/GetListOrder')
      .pipe(catchError(this.handleError));
  }


  // HttpClient API get() method => Fetch Order
  getOrder(id: string): Observable<Order> {
    return this.http
      .get<Order>('/api/Order/GetOrderByID/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create Order
  addOrUpdateOrder(order: any): Observable<Order> {
    return this.http
      .post<Order>(
        '/api/Order/AddOrUpdateOrder',
        JSON.stringify(order),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  checkTotalAllData(): Observable<ResponseModel> {
    return this.http
      .get<ResponseModel>('/api/Order/CheckTotalAllData')
      .pipe(catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Order
  deleteOrder(ids: any) {
    return this.http
      .post<ResponseModel>(
        '/api/Order/DeleteOrder/',
        JSON.stringify(ids),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
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
