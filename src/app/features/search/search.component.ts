import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpotifyService } from '../../core/services/spotify.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  searchTerm: string = '';
  artists: any[] = [];
  suggestedPlaylists: any[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.loadSuggestedPlaylists();
  }

  onSearch(term: string): void {
    this.query = term;
    if (this.query) {
      this.spotifyService.searchArtists(this.query).subscribe(data => {
        this.artists = data.artists?.items || [];
      });
    } else {
      this.artists = [];
    }
  }

  private loadSuggestedPlaylists(): void {
    this.spotifyService.getUserPlaylists().subscribe(data => {
      this.suggestedPlaylists = data.items;
    });
  }

  trackByArtistId(index: number, artist: any): string {
    return artist.id;
  }
}
