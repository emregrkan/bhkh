import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'
import { EmailAndPasswordModel } from '../models/email-and-password-model';
import { TokenResponseModel } from '../models/token-response-model';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  }),
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = `${environment.api}/auth/login`;

  constructor(private http: HttpClient) {}

  signIn(emailAndPassword: EmailAndPasswordModel): Observable<TokenResponseModel>  {
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", emailAndPassword.email);
    urlencoded.append("password", emailAndPassword.password);

    return this.http.post<TokenResponseModel>(this.apiUrl, urlencoded, httpOptions);
  }
}
