import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../core/services/spotify.service';
import { FollowService } from '../../core/services/follow.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlist: any;
  tracks: any[] = [];  // Initialize tracks as an empty array
  isFollowing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    @Inject(FollowService) private followService: FollowService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const playlistId = params.get('id');
      if (playlistId) {
        this.loadPlaylistData(playlistId);
      }
    });
  }

  private loadPlaylistData(playlistId: string): void {
    this.spotifyService.getPlaylist(playlistId).subscribe(data => {
      this.playlist = data;
      this.tracks = data.tracks.items;  // Assign tracks to the property
      this.checkIfFollowing(playlistId);
    });
  }

  toggleFollowPlaylist(): void {
    if (this.isFollowing) {
      this.unfollowPlaylist();
    } else {
      this.followPlaylist();
    }
  }

  followPlaylist(): void {
    if (this.playlist) {
      this.followService.followPlaylist(this.playlist.id);
      this.isFollowing = true;
    }
  }

  unfollowPlaylist(): void {
    if (this.playlist) {
      this.followService.unfollowPlaylist(this.playlist.id);
      this.isFollowing = false;
    }
  }

  private checkIfFollowing(playlistId: string): void {
    // Implement logic to check if the user is following the playlist
    // Set this.isFollowing based on the result
  }
}
