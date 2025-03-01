import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-spotify-dark to-black">
      <div class="max-w-md w-full p-8">
        <img src="assets/spotify-white.png" alt="Spotify" class="h-16 mx-auto mb-8">
        <h1 class="text-4xl font-bold text-center mb-8">Log in to Spotify</h1>
        <button (click)="login()" class="w-full spotify-button py-4 text-lg">
          Continue with Spotify
        </button>
      </div>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);

  login(): void {
    this.authService.login();
  }
}
