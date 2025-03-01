import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Artist, Album, Track, PlaybackState } from '../models/spotify.models';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = environment.spotifyApiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  searchArtists(query: string): Observable<{ artists: { items: Artist[] } }> {
    return this.http.get<{ artists: { items: Artist[] } }>(`${this.apiUrl}/search`, {
      headers: this.getHeaders(),
      params: { q: query, type: 'artist' }
    }).pipe(
      catchError(this.handleError)
    );
  }

  getArtist(artistId: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/artists/${artistId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getArtistAlbums(artistId: string): Observable<{ items: Album[] }> {
    return this.http.get<{ items: Album[] }>(`${this.apiUrl}/artists/${artistId}/albums`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAlbum(albumId: string): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/albums/${albumId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAlbumTracks(albumId: string): Observable<{ items: Track[] }> {
    return this.http.get<{ items: Track[] }>(`${this.apiUrl}/albums/${albumId}/tracks`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getArtistTopTracks(artistId: string): Observable<{ tracks: Track[] }> {
    return this.http.get<{ tracks: Track[] }>(`${this.apiUrl}/artists/${artistId}/top-tracks`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getCurrentPlaybackState(): Observable<PlaybackState> {
    return this.http.get<PlaybackState>(`${this.apiUrl}/me/player`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getUserPlaylists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me/playlists`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  followPlaylist(playlistId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/playlists/${playlistId}/followers`, {}, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  unfollowPlaylist(playlistId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/playlists/${playlistId}/followers`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  followArtist(artistId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/me/following?type=artist&ids=${artistId}`, {}, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  unfollowArtist(artistId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/me/following?type=artist&ids=${artistId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  followAlbum(albumId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/me/albums?ids=${albumId}`, {}, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  unfollowAlbum(albumId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/me/albums?ids=${albumId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  followTrack(trackId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/me/tracks?ids=${trackId}`, {}, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  unfollowTrack(trackId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/me/tracks?ids=${trackId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getPlaylist(playlistId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/playlists/${playlistId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.authService.logout();
    }
    return throwError(() => error);
  }
}
