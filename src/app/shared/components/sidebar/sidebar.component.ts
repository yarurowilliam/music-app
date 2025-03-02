import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpotifyService } from '../../../core/services/spotify.service';
import { Playlist } from '../../../core/models/spotify.models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="bg-black h-full p-6">
      <div class="mb-6">
        <img src="assets/spotify-white.png" alt="Spotify" class="h-10">
      </div>

      <nav class="space-y-4">
        <a routerLink="/search" routerLinkActive="text-white" class="nav-link flex items-center gap-4">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <span>Search</span>
        </a>
        <a routerLink="/library" routerLinkActive="text-white" class="nav-link flex items-center gap-4">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
          </svg>
          <span>Your Library</span>
        </a>
      </nav>

      <div class="mt-8 space-y-4">
        @for (playlist of playlists; track playlist.id) {
          <a [routerLink]="['/playlist', playlist.id]" 
             class="block text-[#B3B3B3] hover:text-white transition-colors">
            {{playlist.name}}
          </a>
        }
      </div>
    </aside>
  `
})
export class SidebarComponent {
  private spotifyService = inject(SpotifyService);
  playlists: Playlist[] = [];

  ngOnInit() {
    this.loadPlaylists();
  }

  private loadPlaylists() {
    this.spotifyService.getUserPlaylists().subscribe({
      next: (data) => this.playlists = data.items
    });
  }
}
