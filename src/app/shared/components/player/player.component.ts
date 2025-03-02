import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { Track } from '../../../core/models/spotify.models';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Current Track -->
        <div class="flex items-center w-1/3">
          @if (currentTrack(); as track) {
            <img [src]="getTrackImage(track)" 
                [alt]="track.name"
                class="w-14 h-14 mr-4"
            />
            <div>
              <h4 class="text-sm font-medium">{{track.name}}</h4>
              <p class="text-xs text-[#B3B3B3]">{{getArtistName(track)}}</p>
            </div>
          }
        </div>

        <!-- Player Controls -->
        <div class="flex flex-col items-center w-1/3">
          <div class="flex items-center gap-4">
            <button class="text-[#B3B3B3] hover:text-white">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            <button (click)="playerService.togglePlay()"
                    class="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              @if (isPlaying()) {
                <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              } @else {
                <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              }
            </button>
          </div>
        </div>

        <!-- Volume Control -->
        <div class="flex items-center justify-end w-1/3">
          <input type="range" 
                min="0" 
                max="1" 
                step="0.1"
                [value]="volume()"
                (input)="onVolumeChange($event)"
                class="w-24"
          />
        </div>
      </div>
    </div>
  `
})
export class PlayerComponent {
  readonly playerService = inject(PlayerService);
  
  currentTrack = computed(() => this.playerService.state$().currentTrack);
  isPlaying = computed(() => this.playerService.state$().isPlaying);
  volume = computed(() => this.playerService.state$().volume);

  getTrackImage(track: Track): string {
    return track.album?.images[0]?.url || '/assets/default-album.png';
  }

  getArtistName(track: Track): string {
    return track.artists[0]?.name || 'Unknown Artist';
  }

  onVolumeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.playerService.setVolume(Number(value));
  }
}
