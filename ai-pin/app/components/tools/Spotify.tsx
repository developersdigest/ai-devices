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
// "use client";
// import SpotifyPlayer from 'react-spotify-player';

// // size may also be a plain string using the presets 'large' or 'compact'
// const size = {
//     width: '100%',
//     height: 300,
// };
// const view = 'list'; // or 'coverart'
// const theme = 'black'; // or 'white'

// // <SpotifyPlayer
// //     uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
// //     size={size}
// //     view={view}
// //     theme={theme}
// // />
// "use client";
// import SpotifyPlayer from 'react-spotify-web-playback';

// <SpotifyPlayer
//     token="BQAI_7RWPJuqdZxS-I8XzhkUi9RKr8Q8UUNaJAHwWlpIq6..."
//     uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
// />;