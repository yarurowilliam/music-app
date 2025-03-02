import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../core/services/spotify.service';
import { Artist, Album, Track } from '../../core/models/spotify.models';
import { TrackListComponent } from '../../shared/components/track-list/track-list.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, RouterModule, TrackListComponent, LoadingComponent],
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private spotifyService = inject(SpotifyService);

  artist: Artist = {
    id: '',
    name: '',
    images: [],
    followers: { total: 0 },
    genres: []
  };
  albums: Album[] = [];
  topTracks: Track[] = [];

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');
    if (artistId) {
      this.loadArtistData(artistId);
    }
  }

  private loadArtistData(artistId: string): void {
    this.spotifyService.getArtist(artistId).subscribe((artist: Artist) => {
      this.artist = artist;
    });

    this.spotifyService.getArtistAlbums(artistId).subscribe(data => {
      this.albums = data.items;
    });

    this.spotifyService.getArtistTopTracks(artistId).subscribe(data => {
      this.topTracks = data.tracks;
    });
  }

  getImageUrl(images: any[]): string {
    return images && images.length > 0 ? images[0].url : '/assets/default-artist.png';
  }
}
