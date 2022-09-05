import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
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
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  signIn(emailAndPassword: EmailAndPasswordModel) {
    const urlencoded = new URLSearchParams();
    urlencoded.append('email', emailAndPassword.email);
    urlencoded.append('password', emailAndPassword.password);

    this.http
      .post<TokenResponseModel>(this.apiLoginUrl, urlencoded, httpOptions)
      .subscribe({
        next: ({ accessToken }) => (this.accessToken = accessToken),
        error: (err) => {
          console.log(err);
          this.accessToken = null;
        },
      });
  }

  refreshToken() {
    this.http
      .get<TokenResponseModel>(this.apiRefreshUrl, httpOptions)
      .subscribe({
        next: ({ accessToken }) => (this.accessToken = accessToken),
        complete() {
          console.log('auth service: refresh completed');
        },
      });
  }

  get token(): string | null {
    return this.accessToken;
  }

  getTestUsers() {
    // TODO: fix interceptor
    return this.http.get(`${environment.api}/users`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }
}
