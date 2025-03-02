export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface Artist {
  id: string;
  name: string;
  images: SpotifyImage[];
  followers: {
    total: number;
  };
  genres: string[];
}

export interface Album {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  artists: Artist[];
  total_tracks: number;
  tracks: {
    items: Track[];
  };
}

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  preview_url: string;
  external_urls: {
    spotify: string;
  };
  artists: Artist[];
  album?: Album;
}

export interface PlaybackState {
  is_playing: boolean;
  item: Track;
  progress_ms: number;
  device: {
    id: string;
    name: string;
    volume_percent: number;
  };
}

export interface UserProfile {
  id: string;
  display_name: string;
  images: SpotifyImage[];
  product: string;
}

export interface Playlist {
  id: string;
  name: string;
  images: SpotifyImage[];
  owner: {
    display_name: string;
  };
  tracks: {
    total: number;
  };
}
