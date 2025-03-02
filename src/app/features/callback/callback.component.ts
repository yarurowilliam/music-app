import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-callback',
  template: `<p>Loading...</p>`
})
export class CallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const hash = window.location.hash;
    const token = this.getTokenFromHash(hash);
    if (token) {
        this.authService.setAccessToken(token);
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  private getTokenFromHash(hash: string): string | null {
    const params = new URLSearchParams(hash.startsWith('#') ? hash.substring(1) : hash);
    return params.get('access_token');
  }  
}
