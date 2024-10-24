// src/Playlist.tsx
import React from 'react';

interface Song {
    title: string;
    artist: string;
    src: string;
}

interface PlaylistProps {
    songs: Song[];
    selectSong: (song: Song) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ songs, selectSong }) => {
    return (
        <div className="playlist">
            <h3>Lista de Canciones</h3>
            <ul>
                {songs.map((song, index) => (
                    <li key={index} onClick={() => selectSong(song)}>
                        {song.title} - {song.artist}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
