import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpotifyService } from '../../core/services/spotify.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Artist } from '../../core/models/spotify.models';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  private spotifyService = inject(SpotifyService);
  private searchTerms = new Subject<string>();
  artists: Artist[] = [];
  searchTerm = '';

  constructor() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.spotifyService.searchArtists(term))
    ).subscribe(data => {
      this.artists = data.artists.items;
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchTerms.next(term);
  }
}
