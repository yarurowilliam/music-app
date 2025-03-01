import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'search',
        loadComponent: () => import('./features/search/search.component')
          .then(m => m.SearchComponent)
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
        path: '',
        pathMatch: 'full',
        redirectTo: 'search'
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
