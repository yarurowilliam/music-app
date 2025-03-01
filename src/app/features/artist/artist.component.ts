import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpotifyService } from '../../core/services/spotify.service';
import { Artist, Album, Track, SpotifyImage } from '../../core/models/spotify.models';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artist: Artist | null = null;
  albums: Album[] = [];
  topTracks: Track[] = [];
  isFollowing: boolean = false;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');
    if (artistId) {
      this.loadArtistData(artistId);
    }
  }

  private loadArtistData(artistId: string): void {
    this.spotifyService.getArtist(artistId).subscribe((artist: Artist) => {
      this.artist = artist;

      // Verificar que tenga imágenes, si no, asignar una por defecto
      if (!this.artist.images || this.artist.images.length === 0) {
        this.artist.images = [{ url: '/assets/default-artist.png', height: 0, width: 0 }];
      }
    });

    this.spotifyService.getArtistAlbums(artistId).subscribe(data => {
      this.albums = data.items;
    });

    this.spotifyService.getArtistTopTracks(artistId).subscribe(data => {
      this.topTracks = data.tracks;
    });

    this.checkIfFollowing(artistId);
  }

  playTrack(previewUrl: string): void {
    const audio = new Audio(previewUrl);
    audio.play();
  }

  getImageUrl(images: SpotifyImage[]): string {
    return images?.[0]?.url || '/assets/default-album.png';
  }

  toggleFollowArtist(): void {
    if (this.isFollowing) {
      this.unfollowArtist();
    } else {
      this.followArtist();
    }
  }

  followArtist(): void {
    if (this.artist) {
      this.spotifyService.followArtist(this.artist.id).subscribe(() => {
        this.isFollowing = true;
      });
    }
  }

  unfollowArtist(): void {
    if (this.artist) {
      this.spotifyService.unfollowArtist(this.artist.id).subscribe(() => {
        this.isFollowing = false;
      });
    }
  }

  private checkIfFollowing(artistId: string): void {
    // Implement logic to check if the user is following the artist
    // Set this.isFollowing based on the result
  }
}
