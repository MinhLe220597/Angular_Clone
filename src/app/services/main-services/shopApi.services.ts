import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Shop } from '../../models/main-models/shop';
import { ResponseModel } from '../../models/core-models/response';

@Injectable({
  providedIn: 'root',
})
export class ShopServices {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch Shops list
  getShops(): Observable<Shop[]> {
    return this.http.get<ResponseModel>('/api/Shop/GetListShopMulti').pipe(
      map((res) => res.Data),
      catchError(this.handleError)
    );
  }

  // HttpClient API get() method => Fetch Shop
  getShop(id: string): Observable<Shop> {
    return this.http
      .get<Shop>('/api/Shop/GetShopByID/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create Shop
  addOrUpdateShop(shop: any): Observable<Shop> {
    return this.http
      .post<Shop>(
        '/api/Shop/AddOrUpdateShop',
        JSON.stringify(shop),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete Shop
  deleteShop(ids: any) {
    return this.http
      .post<Shop>(
        '/api/Shop/DeleteShop/',
        JSON.stringify(ids),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  checkTotalShop(): Observable<ResponseModel> {
    return this.http
      .get<ResponseModel>('/api/Shop/CheckTotalShop')
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
