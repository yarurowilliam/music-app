import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from '../../core/models/spotify.models';

export interface PlayerState {  // Ensure this is exported
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private state = new BehaviorSubject<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 0.5
  });

  state$ = this.state.asObservable();

  playTrack(track: Track): void {
    this.state.next({ ...this.state.value, currentTrack: track, isPlaying: true });
    const audio = new Audio(track.preview_url);
    audio.volume = this.state.value.volume;
    audio.play();
  }

  pauseTrack(): void {
    this.state.next({ ...this.state.value, isPlaying: false });
    // Implement pause functionality
  }

  nextTrack(): void {
    // Implement next track functionality
  }

  setVolume(volume: number): void {
    this.state.next({ ...this.state.value, volume });
    // Implement volume change functionality
  }

  togglePlay(): void {
    if (this.state.value.isPlaying) {
      this.pauseTrack();
    } else {
      if (this.state.value.currentTrack) {
        this.playTrack(this.state.value.currentTrack);
      }
    }
  }
}
