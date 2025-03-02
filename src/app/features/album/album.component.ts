import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../core/services/spotify.service';
import { Album, Track } from '../../core/models/spotify.models';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { TrackListComponent } from '../../shared/components/track-list/track-list.component';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, LoadingComponent, TrackListComponent],
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private spotifyService = inject(SpotifyService);

  album: Album | null = null;
  tracks: Track[] = [];
  isLoading = true;

  ngOnInit(): void {
    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId) {
      this.loadAlbumData(albumId);
    }
  }

  private loadAlbumData(albumId: string): void {
    this.spotifyService.getAlbum(albumId).subscribe({
      next: (album) => {
        this.album = album;
        this.tracks = album.tracks.items;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }
}
