import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Customer } from '../../models/main-models/customer';
import { ResponseModel } from '../../models/core-models/response';

@Injectable({
  providedIn: 'root',
})
export class CustomerServices {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch Customers list
  getCustomers(): Observable<Customer[]> {
    return this.http.get<ResponseModel>('/api/Customer/GetListCustomerMulti').pipe(
      map((res) => res.Data),
      catchError(this.handleError)
    );
  }

  // HttpClient API get() method => Fetch Customer
  getCustomer(id: string): Observable<Customer> {
    return this.http
      .get<Customer>('/api/Customer/GetCustomerByID/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create Customer
  addOrUpdateCustomer(customer: any): Observable<ResponseModel> {
    return this.http
      .post<ResponseModel>(
        '/api/Customer/AddOrUpdateCustomer',
        JSON.stringify(customer),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Customer
  deleteCustomer(ids: any) {
    return this.http
      .post<Customer>(
        '/api/Customer/DeleteCustomer/',
        JSON.stringify(ids),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  checkTotalCustomer(): Observable<ResponseModel> {
    return this.http
      .get<ResponseModel>('/api/Customer/CheckTotalCustomer')
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
