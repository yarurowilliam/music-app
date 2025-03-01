import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [LoadingComponent],
  template: `<app-loading></app-loading>`
})
export class CallbackComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
      this.authService.setToken(accessToken);
      this.router.navigate(['/search']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
