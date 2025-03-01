import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <img src="assets/images/spotify-white.png" alt="Spotify Logo">
      <button (click)="login()" class="spotify-button">Login with Spotify</button>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: var(--spotify-black);
    }
    .spotify-button {
      margin-top: 20px;
    }
  `]
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login();
  }
}
