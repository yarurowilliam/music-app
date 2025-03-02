import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../core/services/spotify.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="main-container">
      <div class="artist-header mb-8">
        <div class="flex items-end space-x-6">
          <img [src]="artist?.images[0]?.url" 
               [alt]="artist?.name"
               class="w-60 h-60 rounded-lg shadow-xl"
          />
          <div>
            <h1 class="text-5xl font-bold mb-4">{{artist?.name}}</h1>
            <p class="text-[#B3B3B3]">{{artist?.followers?.total | number}} followers</p>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-6">Albums</h2>
      <div class="grid-container">
        <div *ngFor="let album of albums" 
             class="album-card card-hover cursor-pointer"
             [routerLink]="['/album', album.id]">
          <img [src]="album.images[0]?.url" 
               [alt]="album.name"
               class="w-full aspect-square object-cover rounded-lg mb-4"
          />
          <h3 class="font-bold mb-2">{{album.name}}</h3>
          <p class="text-[#B3B3B3]">{{album.release_date | date:'yyyy'}}</p>
        </div>
      </div>
    </div>
  `
})
export class ArtistComponent implements OnInit {
  artist: any;
  albums: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');
    if (artistId) {
      this.loadArtistData(artistId);
    }
  }

  private loadArtistData(artistId: string): void {
    this.spotifyService.getArtistAlbums(artistId).subscribe(data => {
      this.albums = data.items;
    });
  }
}
