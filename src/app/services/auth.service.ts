import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailAndPasswordModel } from '../models/email-and-password-model';
import { TokenResponseModel } from '../models/token-response-model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiLoginUrl: string = `${environment.api}/auth/login`;
  private apiRefreshUrl: string = `${environment.api}/auth/refresh`;
  private accessToken: string = '';

  constructor(private http: HttpClient) {}

  signIn(
    emailAndPassword: EmailAndPasswordModel
  ): Observable<TokenResponseModel> {
    const urlencoded = new URLSearchParams();
    urlencoded.append('username', emailAndPassword.email);
    urlencoded.append('password', emailAndPassword.password);

    return this.http.post<TokenResponseModel>(
      this.apiLoginUrl,
      urlencoded,
      httpOptions
    );
  }

  refreshToken(): Observable<TokenResponseModel> {
    return this.http.get<TokenResponseModel>(this.apiRefreshUrl, httpOptions);
  }

  get token(): string {
    if (this.accessToken) {
      return this.accessToken;
    }

    this.refreshToken().subscribe({
      next: ({ accessToken }) => (this.accessToken = accessToken),
    });

    return this.accessToken;
  }

  getTestUsers() {
    return this.http.get(`${environment.api}/users`, httpOptions);
  }
}
