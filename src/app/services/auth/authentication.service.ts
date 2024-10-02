import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtAuth } from 'src/app/models/auth-models/jwtAuth';
import { Register } from 'src/app/models/auth-models/register';
import { Login } from 'src/app/models/auth-models/login';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  registerUrl = 'AuthManagement/Register';
  loginUrl = 'AuthManagement/Login';
  weatherUrl = 'WeatherForecast';

  constructor(private http: HttpClient) {}

  public register(register: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(
      `${environment.coreApiUrl}/${this.registerUrl}`,
      register
    );
  }

  public login(login: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(
      `${environment.coreApiUrl}/${this.loginUrl}`,
      login
    );
  }

  public getWeather(): Observable<any> {
    return this.http.get<JwtAuth>(
      `${environment.coreApiUrl}/${this.weatherUrl}`
    );
  }
}
