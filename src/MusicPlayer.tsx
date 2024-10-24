// src/MusicPlayer.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Song {
    title: string;
    artist: string;
    src: string;
    cover: string; // Nueva propiedad para la portada
}

interface MusicPlayerProps {
    song: Song;
    onNext: () => void;
    onPrevious: () => void;
    initialVolume?: number;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ song, onNext, onPrevious, initialVolume = 1 }) => {
    const [isPlaying, setIsPlaying] = useState(true); // Inicia en true para reproducir automáticamente
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(initialVolume);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.play();
        }
    }, [song, volume]); // Reproduce automáticamente al cambiar de canción

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(e.target.value);
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setVolume(newVolume);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, []);

    return (
        <div className="music-player">
            <div className="cover-container">
                <img src={song.cover} alt={song.title} className="cover-image" />
            </div>
            <h2>{song.title}</h2>
            <p>{song.artist}</p>
            <audio ref={audioRef} src={song.src} autoPlay />

            <div className="controls">
                <button onClick={onPrevious}>Anterior</button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? 'Pausar' : 'Reproducir'}
                </button>
                <button onClick={onNext}>Siguiente</button>
            </div>

            <div className="progress-container">
                <span>{formatTime(currentTime)}</span>
                <input
                    type="range"
                    min="0"
                    max={duration.toString()}
                    value={currentTime}
                    onChange={handleProgressChange}
                />
                <span>{formatTime(duration)}</span>
            </div>

            <div className="volume-container">
                <label>Volumen {Math.round(volume * 100)}</label> {/* Muestra el volumen como un número */}
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
    );
};

export default MusicPlayer;
