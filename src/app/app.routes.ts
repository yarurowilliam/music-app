import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { provideRouter, withHashLocation } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component')
          .then(m => m.HomeComponent)
      },
      {
        path: 'search',
        loadComponent: () => import('./features/search/search.component')
          .then(m => m.SearchComponent)
      },
      {
        path: 'library',
        loadComponent: () => import('./features/library/library.component')
          .then(m => m.LibraryComponent)
      },
      {
        path: 'artist/:id',
        loadComponent: () => import('./features/artist/artist.component')
          .then(m => m.ArtistComponent)
      },
      {
        path: 'album/:id',
        loadComponent: () => import('./features/album/album.component')
          .then(m => m.AlbumComponent)
      },
      {
        path: 'playlist/:id',
        loadComponent: () => import('./features/playlist/playlist.component')
          .then(m => m.PlaylistComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'callback',
    loadComponent: () => import('./features/auth/callback/callback.component')
      .then(m => m.CallbackComponent)
  }
];

export const routerProvider = [
  provideRouter(routes, withHashLocation())
];
