import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Artist, Album, Track, PlaybackState } from '../models/spotify.models';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = environment.spotifyApiUrl;

  constructor(private http: HttpClient) {}

  searchArtists(query: string): Observable<{ artists: { items: Artist[] } }> {
    return this.http.get<{ artists: { items: Artist[] } }>(`${this.apiUrl}/search`, {
      params: { q: query, type: 'artist' }
    });
  }

  getArtist(artistId: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/artists/${artistId}`);
  }

  getArtistAlbums(artistId: string): Observable<{ items: Album[] }> {
    return this.http.get<{ items: Album[] }>(`${this.apiUrl}/artists/${artistId}/albums`);
  }

  getAlbum(albumId: string): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/albums/${albumId}`);
  }

  getAlbumTracks(albumId: string): Observable<{ items: Track[] }> {
    return this.http.get<{ items: Track[] }>(`${this.apiUrl}/albums/${albumId}/tracks`);
  }

  getArtistTopTracks(artistId: string): Observable<{ tracks: Track[] }> {
    return this.http.get<{ tracks: Track[] }>(`${this.apiUrl}/artists/${artistId}/top-tracks`);
  }

  getCurrentPlaybackState(): Observable<PlaybackState> {
    return this.http.get<PlaybackState>(`${this.apiUrl}/me/player`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  getUserPlaylists(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me/playlists`);
  }

  followPlaylist(playlistId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/playlists/${playlistId}/followers`, {});
  }

  unfollowPlaylist(playlistId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/playlists/${playlistId}/followers`);
  }
}
