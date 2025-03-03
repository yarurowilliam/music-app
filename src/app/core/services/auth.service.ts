import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'spotify_access_token';

  private readonly requiredScopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-read',
    'user-top-read',
    'user-read-recently-played'
  ];

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
    const { clientId, authEndpoint, redirectUri } = environment.spotifyConfig;
    const authUrl = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${this.requiredScopes.join('%20')}&show_dialog=true`;
    window.location.href = authUrl;
  }

  public handleAuthError(): void {
    this.logout();
    this.login();
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
