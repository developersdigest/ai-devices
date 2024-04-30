import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const api = SpotifyApi.withClientCredentials(
    "907ed817290a4dcdb124f824263de429",
    "0a23b2dd4fdf4779b4d389e44075a718"
);

export async function searchSong(query: string): Promise<string> {
    const items = await api.search(query, ["track"]);
    const track = items.tracks.items[0];
    if (track) {
        const trackId = track.uri.replace('spotify:track:', '');
        return trackId;
    } else {
        return "No matching song found.";
    }
}