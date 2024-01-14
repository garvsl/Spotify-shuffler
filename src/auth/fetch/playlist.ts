/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { currentToken } from '../token';

export async function getPlaylistTracks(playlistId: any, offset: number, limit: number) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}&fields=limit,offset,total%2Citems%28track%28id%29%29`,
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + currentToken.access_token }
    }
  );
  return await response.json();
}

export async function getAllPlaylistTracks(
  currentToken: any,
  playlistId: any,
  tracks: any,
  trackNumLeft: number
): Promise<any> {
  if (trackNumLeft <= 0) {
    return tracks.items;
  }
  const tracksed = await getPlaylistTracks(
    playlistId,
    tracks?.offset + tracks?.items?.length,
    trackNumLeft > 100 ? 100 : trackNumLeft
  );
  const theTracks = await getAllPlaylistTracks(
    currentToken,
    playlistId,
    tracksed,
    trackNumLeft - tracksed?.items?.length
  );
  return theTracks.concat(tracks.items);
}

export function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export async function shuffleTracks(playlistId: any) {
  const tracks = await getPlaylistTracks(playlistId, 0, 100);
  const allTracks = await getAllPlaylistTracks(
    currentToken,
    playlistId,
    tracks,
    tracks?.total - tracks?.items?.length
  );
  return shuffleArray(allTracks);
}

export async function createPlaylist(title: string, user: any) {
  const response = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + currentToken.access_token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: `Shuffled ${title}`, public: false })
  });
  const data = await response.json();
  return data;
}

function spliceArray(array: any): any {
  let splicedArray = [];
  while (array.length > 0) {
    let chunk = array.splice(0, 100);
    let uris = chunk.map((track: { track: { id: any } }) => `spotify:track:${track.track.id}`);
    splicedArray.push(uris);
  }
  return splicedArray;
}

export async function addTracksToPlaylist(playlistId: any, tracks: any) {
  const splicedArray = spliceArray(tracks);

  splicedArray.map(async (uriArray: any) => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + currentToken.access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris: uriArray })
    });
    const result = await response.json();

    return result;
  });
}
