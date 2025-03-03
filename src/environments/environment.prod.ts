export const environment = {
  production: true,
  spotifyApiUrl: 'https://api.spotify.com/v1',
  spotifyConfig: {
    clientId: '915fb75539bd4c03b6ddbe6ac80a4d0a',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    redirectUri: 'http://localhost:4200/callback',
    scopes: [
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'streaming'
    ]
  }
};