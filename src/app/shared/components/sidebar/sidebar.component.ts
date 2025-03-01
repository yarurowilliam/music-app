import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';  
import { FollowService } from '../../../core/services/follow.service';

interface Playlist {
  id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  followedPlaylists$!: Observable<Playlist[]>;

  constructor(@Inject(FollowService) private followService: FollowService) {}

  ngOnInit(): void {
    this.followedPlaylists$ = this.followService.followedPlaylists$;
  }
}
