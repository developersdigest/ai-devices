import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const api = SpotifyApi.withClientCredentials(
    process.env.SPOTIFY_CLIENT_ID as string,
    process.env.SPOTIFY_CLIENT_SECRET as string
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