import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'spotify_access_token';

  constructor(private router: Router) {}

  public setAccessToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  public login(): void {
    const { clientId, authEndpoint, redirectUri, scopes } = environment.spotifyConfig;
    const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&show_dialog=true`;
    window.location.href = authUrl;
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
