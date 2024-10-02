import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { TopicModel, Topic } from 'src/app/models/main-models/topic';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LearnVocabService {
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public getTopics(): Observable<Topic[]> {
    return this.http
      .get<TopicModel>(
        `${environment.learnVocabApiUrl}/TopicVocabulary/GetTopics`
      )
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  public getData(): Observable<TopicModel> {
    return this.http.get<TopicModel>(
      `${environment.coreApiUrl}/TopicVocabulary/GetTopics`
    );
  }

  // Error handling
  private handleError(error: {
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
