import { Injectable, signal } from '@angular/core';
import { Track } from '../../core/models/spotify.models';

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private audio = new Audio();
  private state = signal<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 1
  });

  state$ = this.state;

  playTrack(track: Track): void {
    if (track.preview_url) {
      this.audio.src = track.preview_url;
      this.audio.play();
      this.state.set({ ...this.state(), currentTrack: track, isPlaying: true });
    }
  }

  togglePlay(): void {
    if (this.state().isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.state.update(state => ({ ...state, isPlaying: !state.isPlaying }));
  }

  setVolume(volume: number): void {
    this.audio.volume = volume;
    this.state.update(state => ({ ...state, volume }));
  }
}
