import { populateUI } from "../ui/profile";
import { fetchProfile } from "./fetch";
import { getAccessToken } from "./getToken";
import { redirectToAuthCodeFlow } from "./redirectAuth";

export async function intialize(){
    const clientId = '046df2a638584856a52c02e46a4bb869'
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");


    if (!code) {
        redirectToAuthCodeFlow(clientId);
    } else {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        populateUI(profile);
    }
}