import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'spotify_token';

  login(): void {
    const { clientId, redirectUri, scopes, authEndpoint } = environment.spotifyConfig;
    const scopeStr = scopes.join(' ');
    const url = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopeStr}&show_dialog=true`;
    window.location.href = url;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getAuthUrl(): string {
    const { clientId, redirectUri, scopes, authEndpoint } = environment.spotifyConfig;
    return `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join(' ')}`;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
