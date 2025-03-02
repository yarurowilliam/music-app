import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private followedPlaylistsSubject = new BehaviorSubject<any[]>([]);
  followedPlaylists$ = this.followedPlaylistsSubject.asObservable();

  constructor(private spotifyService: SpotifyService) {
    this.loadFollowedPlaylists();
  }

  private loadFollowedPlaylists(): void {
    this.spotifyService.getUserPlaylists().subscribe(data => {
      this.followedPlaylistsSubject.next(data.items);
    });
  }

  followPlaylist(playlistId: string): void {
    this.spotifyService.followPlaylist(playlistId).subscribe(() => {
      this.loadFollowedPlaylists();
    });
  }

  unfollowPlaylist(playlistId: string): void {
    this.spotifyService.unfollowPlaylist(playlistId).subscribe(() => {
      this.loadFollowedPlaylists();
    });
  }
}
