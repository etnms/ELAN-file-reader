import { useEffect, useRef, useState } from 'react';
import './App.css';
import WaveSurfer from 'wavesurfer.js';

function App() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferRef = useRef<WaveSurfer | null>(null); // Store the Wavesurfer instance separately

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F4A85',
        progressColor: '#383351',
        url: './src/test.mp3',
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

  const handlePlay = () => {
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
      <p>Test</p>
      <div ref={waveformRef}></div>
      <button onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
    </>
  );
}

export default App;