import { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styles from './AudioPlayer.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTime } from '../features/CurrentTimeSlice';

const AudioPlayer: React.FC = () => {

    const waveformRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const wavesurferRef = useRef<WaveSurfer | null>(null); // Store the Wavesurfer instance separately

    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);

    const currentTime: number = useAppSelector(state => state.currentTime.currentTime);

    const fileUrl: string = useAppSelector(state => state.selectedFiles.fileUrl);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (waveformRef.current) {
            const wavesurfer: WaveSurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#4F4A85',
                progressColor: '#383351',
            });

            wavesurferRef.current = wavesurfer; // Assign the Wavesurfer instance to the ref
            wavesurfer.on('audioprocess', () => {
                dispatch(setCurrentTime(wavesurfer.getCurrentTime()))
                setEndTime(wavesurfer.getDuration());
            });

            setStartTime(0);
        }

        // Cleanup
        return () => {
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy();
            }
        };
    }, []);


    useEffect(() => {
        console.log('loading audio file');
        loadAudioFile(fileUrl);
    }, [fileUrl])

    // Handle play/pause of the audio reader
    const handlePlay: () => void = () => {
        if (wavesurferRef.current) {
            if (!isPlaying) {
                wavesurferRef.current.play(); // Access the Wavesurfer instance directly
            } else {
                wavesurferRef.current.pause(); // Access the Wavesurfer instance directly
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (timeInSeconds: number) => {
        const hours: number = Math.floor(timeInSeconds / 3600);
        const minutes: number = Math.floor((timeInSeconds % 3600) / 60);
        const seconds: number = Math.floor(timeInSeconds % 60);

        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const loadAudioFile = async (fileUrl: string) => {
        if (wavesurferRef.current) {
            try {
                const response: Response = await fetch(fileUrl);
                if (response.ok) {
                    const blob: Blob = await response.blob();
                    const audioUrl: string = URL.createObjectURL(blob);
                    wavesurferRef.current.load(audioUrl);
                }
            } catch (error) {
                console.log('Error:', error);
                // Handle error
            }
        }
    };

    return (
        <div className={styles['container-player']}>
            <div className={styles['container-audio']}>
                <p className={styles.text}>Begin time: {formatTime(startTime)}</p>
                <div ref={waveformRef} className={styles.wave}></div>
                <p className={styles.text}>End time: {formatTime(endTime)}</p>
            </div>
            <div className={styles['container-buttons']}>
                <button onClick={handlePlay} className={styles.button}>{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}</button>
                <p>{formatTime(currentTime)}</p>
            </div>
        </div>
    );
};

export default AudioPlayer;