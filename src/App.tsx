// src/App.tsx
import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import Playlist from './Playlist';
import './App.css';

interface Song {
    title: string;
    artist: string;
    src: string;
    cover: string; // Nueva propiedad para la portada
}

const App: React.FC = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const songs: Song[] = [
        { title: 'Brickell', artist: 'Feid, Yandel', cover: '/imagen/feid.jpeg', src: '/musicas/Feid, Yandel - Brickell.mp3' },
        { title: 'Si antes te hubieras ido', artist: 'Karol G', cover: '/imagen/karol.jpeg', src: '/musicas/KAROL G - Si Antes Te Hubiera Conocido.mp3' },
        { title: 'El merengue', artist: 'Marshmello, Manuel Turizo', cover: '/imagen/mt.jpg', src: '/musicas/Marshmello, Manuel Turizo - El Merengue.mp3' },
        { title: 'Aguardiente', artist: 'Los Terribles Diamantes', cover: '/imagen/Los-terribles-diamantes-de-valencia.jpg', src: '/musicas/Los Terribles Diamantes de Valencia - Aguardiente.mp3' },
        { title: 'Como Te Estoy Queriendo', artist: 'Los Terribles Diamantes', cover: '/imagen/Los-terribles-diamantes-de-valencia.jpg', src: '/musicas/Los Terribles Diamantes de Valencia - Como Te Estoy Queriendo.mp3' },
        { title: 'Mix Cuartetazo - La Arañita de Martita', artist: 'Orq. Tropicalisima', cover: '/imagen/Tropicalisima.jpg', src: '/musicas/Orquesta Tropicalisima - Mix Cuartetazo- La Arañita de Martita, Vol. 5.mp3' },
        { title: 'Che Che', artist: 'Chimbala', cover: '/imagen/che-che.jpg', src: '/musicas/Chimbala - Che Che.mp3' },
    ];

    const handleNextSong = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex === songs.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePreviousSong = () => {
        setCurrentSongIndex((prevIndex) =>
            prevIndex === 0 ? songs.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="app">
            <h1>Reproductor de Música</h1>
            <Playlist
                songs={songs}
                selectSong={(song) =>
                    setCurrentSongIndex(
                        songs.findIndex(s => s.title === song.title && s.artist === song.artist)
                    )
                }
            />
            <MusicPlayer
                song={songs[currentSongIndex]}
                onNext={handleNextSong}
                onPrevious={handlePreviousSong}
            />
        </div>
    );
};

export default App;
