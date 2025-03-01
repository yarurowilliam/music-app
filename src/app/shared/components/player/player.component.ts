import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService, PlayerState } from '../../services/player.service';
import { Track } from '../../../core/models/spotify.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  currentTrack$: Observable<Track | null>;
  isPlaying$: Observable<boolean>;
  volume$: Observable<number>;

  constructor(public playerService: PlayerService) {
    this.currentTrack$ = this.playerService.state$.pipe(map((state: PlayerState) => state.currentTrack));
    this.isPlaying$ = this.playerService.state$.pipe(map((state: PlayerState) => state.isPlaying));
    this.volume$ = this.playerService.state$.pipe(map((state: PlayerState) => state.volume));
  }

  ngOnInit(): void {}

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

  playTrack(track: Track): void {
    this.playerService.playTrack(track);
  }

  pauseTrack(): void {
    this.playerService.pauseTrack();
  }

  nextTrack(): void {
    this.playerService.nextTrack();
  }
}
