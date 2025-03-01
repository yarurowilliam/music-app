import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpotifyService } from '../../core/services/spotify.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="main-container">
      <div class="search-container mb-8">
        <input
          type="text"
          [ngModel]="searchTerm"
          (ngModelChange)="onSearch($event)"
          placeholder="Search for artists..."
          class="w-full p-4 rounded-full bg-[#242424] text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
        />
      </div>

      <div class="grid-container">
        <div *ngFor="let artist of artists" class="artist-card card-hover">
          <img [src]="artist.images[0]?.url || 'assets/default-artist.png'" 
               [alt]="artist.name"
               class="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 class="text-lg font-bold mb-2">{{artist.name}}</h3>
          <p class="text-[#B3B3B3] mb-2">{{artist.followers.total | number}} followers</p>
          <p class="text-[#B3B3B3]">{{artist.genres.join(', ')}}</p>
        </div>
      </div>
    </div>
  `
})
export class SearchComponent {
  private searchTerms = new Subject<string>();
  artists: any[] = [];
  searchTerm: string = '';

  constructor(private spotifyService: SpotifyService) {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.spotifyService.searchArtists(term))
    ).subscribe(data => {
      this.artists = data.artists.items;
    });
  }

  onSearch(event: any): void {
    const term = event.target.value;
    this.searchTerm = term;
    this.searchTerms.next(term);
  }
}
