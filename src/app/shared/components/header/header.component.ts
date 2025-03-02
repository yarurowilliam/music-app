import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SpotifyService } from '../../../core/services/spotify.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 h-16 bg-[rgba(0,0,0,0.7)] backdrop-blur-md">
      <div class="flex items-center justify-between px-6 h-full">
        <div class="flex items-center gap-4">
          <nav class="flex gap-2">
            <button class="p-2 rounded-full bg-black" onclick="history.back()">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button class="p-2 rounded-full bg-black" onclick="history.forward()">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 7.41L10 6l6 6-6 6-1.41-1.41L13.17 12z"/>
              </svg>
            </button>
          </nav>
        </div>

        @if (user(); as userData) {
          <div class="flex items-center gap-2">
            <img [src]="userData.images[0]?.url || '/assets/default-user.png'" 
                 class="w-8 h-8 rounded-full"
                 [alt]="userData.display_name"
            />
            <span class="text-sm font-medium">{{userData.display_name}}</span>
          </div>
        }
      </div>
    </header>
  `
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private spotifyService = inject(SpotifyService);

  user = signal<any>(null);

  constructor() {
    if (this.authService.isAuthenticated()) {
      this.loadUserProfile();
    }
  }

  private loadUserProfile(): void {
    this.spotifyService.getUserProfile().subscribe({
      next: (data) => this.user.set(data),
      error: () => this.authService.logout()
    });
  }
}
