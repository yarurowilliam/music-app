import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { PlayerComponent } from '@shared/components/player/player.component';
import { ToastComponent } from '@shared/components/toast/toast.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    PlayerComponent,
    ToastComponent
  ],
  template: `
    <div class="min-h-screen bg-spotify-dark text-white">
      <app-header />
      <div class="flex">
        <app-sidebar class="w-64 fixed h-[calc(100vh-theme(spacing.16))]" />
        <main class="flex-1 ml-64 p-8">
          <router-outlet />
        </main>
      </div>
      <app-player />
      <app-toast />
    </div>
  `
})
export class MainLayoutComponent {}
