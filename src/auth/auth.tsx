/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

export const AuthContext: any = React.createContext(null);

export const AuthProvider = (props: any) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [playlists, setPlaylists] = React.useState(null);

  const redirectUrl = 'http://localhost:5173'; 
  const authorizationEndpoint = 'https://accounts.spotify.com/authorize';
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  const scope =
    'user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';
  const clientId = '046df2a638584856a52c02e46a4bb869';

  const currentToken = {
    get access_token() {
      return localStorage.getItem('access_token') || null;
    },
    get refresh_token() {
      return localStorage.getItem('refresh_token') || null;
    },
    get expires_in() {
      return localStorage.getItem('refresh_in') || null;
    },
    get expires() {
      return localStorage.getItem('expires') || null;
    },

    save: function (response: any) {
      const { access_token, refresh_token, expires_in } = response;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_in', expires_in);

      const now = new Date();
      const expiry: any = new Date(now.getTime() + expires_in * 1000);
      localStorage.setItem('expires', expiry);
    }
  };

  async function redirectToSpotifyAuthorize() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], '');

    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);

    const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    window.localStorage.setItem('code_verifier', code_verifier);

    const authUrl = new URL(authorizationEndpoint);
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      code_challenge_method: 'S256',
      code_challenge: code_challenge_base64,
      redirect_uri: redirectUrl
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
  }

  // Soptify API Calls
  async function getToken(code: any) {
    const code_verifier = localStorage.getItem('code_verifier');

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUrl,
        code_verifier: code_verifier!
      })
    });

    return await response.json();
  }

  async function refreshToken() {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: currentToken.refresh_token!
      })
    });

    return await response.json();
  }

  async function getUserData() {
    const response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + currentToken.access_token }
    });

    return await response.json();
  }

  async function getUserPlaylists(user: any) {
    const response = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + currentToken.access_token }
    });

    return await response.json();
  }

  // Click handlers
  async function loginWithSpotifyClick() {
    await redirectToSpotifyAuthorize();
  }

  async function logoutClick() {
    localStorage.clear();
    window.location.href = redirectUrl;
  }

  async function refreshTokenClick() {
    const token = await refreshToken();
    currentToken.save(token);
    setUser(null)
  }

  React.useEffect(() => {
    const args = new URLSearchParams(window.location.search);
    const code = args.get('code');


    (async () => {
      if (code) {
        const token = await getToken(code);
        currentToken.save(token);

        // Remove code from URL so we can refresh correctly.
        const url = new URL(window.location.href);
        url.searchParams.delete('code');

        const updatedUrl = url.search ? url.href : url.href.replace('?', '');
        window.history.replaceState({}, document.title, updatedUrl);
        setLoading(false)
      }

      if (currentToken.access_token && currentToken.access_token != 'undefined') {
        const userData = await getUserData();
        setUser(userData);
        const userPlaylists = await getUserPlaylists(userData);
        setPlaylists(userPlaylists);
        console.log(userPlaylists);
        setLoading(false)
      }

      // Otherwise we're not logged in, so render the login template
      if (!currentToken.access_token || currentToken.access_token == 'undefined') {
        setUser(null);
        setLoading(false)
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, playlists, loginWithSpotifyClick, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};
