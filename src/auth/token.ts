/* eslint-disable @typescript-eslint/no-explicit-any */
export const currentToken = {
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
