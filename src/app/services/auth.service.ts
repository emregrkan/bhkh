import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmailAndPasswordModel } from '../models/email-and-password-model';
import { TokenResponseModel } from '../models/token-response-model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiLoginUrl: string = `${environment.api}/auth/login`;
  private apiRefreshUrl: string = `${environment.api}/auth/refresh`;
  private apiMeUrl: string = `${environment.api}/auth/me`;
  private accessToken: string | null = null;

  constructor(private router: Router) {}

  async signIn(emailAndPassword: EmailAndPasswordModel) {
    const urlencoded = new URLSearchParams();
    urlencoded.append('email', emailAndPassword.email);
    urlencoded.append('password', emailAndPassword.password);

    const response = await fetch(this.apiLoginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlencoded,
      credentials: 'include',
    });

    this.accessToken = (
      (await response.json()) as TokenResponseModel
    ).accessToken;

    if (this.accessToken) {
      this.router.navigate(['test-users']);
    }
  }

  async isAuthenticated() {
    const accessToken = await this.getAccessToken();

    if (accessToken) {
      const response = await fetch(this.apiMeUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      return response.status === 200;
    }

    return false;
  }

  private async getAccessToken() {
    if (!this.accessToken) {
      await this.refreshToken();
    }

    return this.accessToken;
  }

  private async refreshToken() {
    try {
      const response = await fetch(this.apiRefreshUrl, {
        method: 'GET',
        credentials: 'include',
      });

      this.accessToken = (
        (await response.json()) as TokenResponseModel
      ).accessToken;
    } catch {
      this.accessToken = null;
    }
  }

  async getTestUsers() {
    const accessToken = await this.getAccessToken();

    if (accessToken) {
      const response = await fetch(`${environment.api}/users`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      return await response.json();
    }
  }
}
