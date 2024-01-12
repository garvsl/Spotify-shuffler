/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
    console.log(token)
    console.log(result)
    return await result.json();
}