export {};  // Ensure TypeScript treats this file as a module

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: (() => void) | undefined;
    Spotify: any;
  }
}
