import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { GridSetting } from '../model/grid.model';

export abstract class NorthwindService extends BehaviorSubject<GridDataResult> {
  public loading!: boolean;

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    let value: GridDataResult = {
      data: [],
      total: 0,
    };
    super(value);
  }

  public query(gridSetting: GridSetting, state: State): void {
    this.fetch(gridSetting, state)
      .pipe()
      .subscribe((data) => {
        super.next(data);
      });
  }

  protected fetch(
    gridSetting: GridSetting,
    state: State
  ): Observable<GridDataResult> {
    this.loading = true;

    let objParam = Object.assign({}, gridSetting['objSearch'], state);
    setTimeout(() => {}, 1000);
    return this.http
      .post<GridDataResult>(
        gridSetting['urlGrid'],
        JSON.stringify(objParam),
        this.httpOptions
      )
      .pipe(
        map(
          (res) =>
            <GridDataResult>{
              data: res['data'],
              total: res['total'],
            }
        ),
        catchError(this.handleError),
        tap(() => {
          this.loading = false;
        })
      );
  }

  // Error handling
  protected handleError(error: {
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

@Injectable()
export class GridService extends NorthwindService {
  constructor(http: HttpClient) {
    super(http);
  }

  queryAll(param: any, st?: State): Observable<GridDataResult> {
    const state = Object.assign({}, st);
    delete state.skip;
    delete state.take;

    return this.fetch(param, state);
  }
}
