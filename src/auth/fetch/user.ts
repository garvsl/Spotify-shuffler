/* eslint-disable @typescript-eslint/no-explicit-any */

import { currentToken } from '../token';

export async function getUserData() {
  const response = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + currentToken.access_token }
  });

  return await response.json();
}

export async function getUserPlaylists() {
  const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + currentToken.access_token }
  });

  return await response.json();
}
