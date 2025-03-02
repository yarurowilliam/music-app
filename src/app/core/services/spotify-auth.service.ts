import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  constructor(private http: HttpClient) {}

  getLoginUrl(): string {
    const params = new URLSearchParams({
      client_id: environment.spotifyConfig.clientId,
      redirect_uri: environment.spotifyConfig.redirectUri,
      scope: environment.spotifyConfig.scopes.join(' '),
      response_type: 'token'
    });
    
    return `${environment.spotifyConfig.authEndpoint}?${params.toString()}`;
  }

  handleAuthCallback(hash: string): void {
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    if (accessToken) {
      localStorage.setItem('spotify_token', accessToken);
    }
  }
}
