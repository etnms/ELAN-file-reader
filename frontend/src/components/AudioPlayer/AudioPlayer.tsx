import { useState, useRef, useEffect, ChangeEvent } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface IResponseData {
    file_url: string;
}

const AudioPlayer: React.FC = () => {

    const backendURL: string = import.meta.env.VITE_BACKEND_URL;

    const waveformRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const wavesurferRef = useRef<WaveSurfer | null>(null); // Store the Wavesurfer instance separately

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (waveformRef.current) {
            const wavesurfer: WaveSurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#4F4A85',
                progressColor: '#383351',
            });

            wavesurferRef.current = wavesurfer; // Assign the Wavesurfer instance to the ref
        }

        // Cleanup
        return () => {
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy();
            }
        };
    }, []);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFileUpload: () => Promise<void> = async () => {
        if (selectedFile) {
            const formData: FormData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response: Response = await fetch(`${backendURL}/upload`, {
                    method: 'POST',
                    body: formData,
                });

                // File uploaded successfully
                if (response.ok) {
                    const data: IResponseData = await response.json();
                    const fileUrl: string = data.file_url;
                    loadAudioFile(fileUrl);
                }
                else {
                    console.log('Error:', response.statusText);
                }

            } catch (error) {
                console.log('Error:', error);
                // Handle error
            }
        }
    };

    const loadAudioFile: (fileUrl: string) => Promise<void> = async (fileUrl: string) => {
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


    return (
        <>
            <div>
                <input type='file' onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Upload audio file</button>
            </div>
            <div>
                <div ref={waveformRef}></div>
                <button onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            </div>
        </>
    );
};

export default AudioPlayer;