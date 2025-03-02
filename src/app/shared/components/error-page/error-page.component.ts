import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-spotify-dark">
      <div class="text-center">
        <h1 class="text-9xl font-bold mb-4">{{code}}</h1>
        <p class="text-2xl mb-8">{{message}}</p>
        <a routerLink="/" class="spotify-button">
          Go back home
        </a>
      </div>
    </div>
  `
})
export class ErrorPageComponent {
  @Input() code = '404';
  @Input() message = 'Page not found';
}
