import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../../core/models/spotify.models';
import { PlayerService } from '../../services/player.service';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule, DurationPipe],
  templateUrl: './track-list.component.html'
})
export class TrackListComponent {
  @Input() tracks: Track[] = [];
  private playerService = inject(PlayerService);

  playTrack(track: Track): void {
    this.playerService.playTrack(track);
  }
}
