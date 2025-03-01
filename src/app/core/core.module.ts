import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { SpotifyService } from './services/spotify.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthService,
    SpotifyService
  ]
})
export class CoreModule {}
