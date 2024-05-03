export const SpotifyTrack = ({ trackId }: { trackId: string }) => {

    if (!trackId) {
        return null; // or return a loading state or error message
    }

    return (
        <iframe
            src={`https://open.spotify.com/embed/track/${trackId}`}
            width="300"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
        ></iframe>
    );
};