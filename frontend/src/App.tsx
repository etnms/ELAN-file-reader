import { ChangeEvent, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

function App() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferRef = useRef<WaveSurfer | null>(null); // Store the Wavesurfer instance separately
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const backend = 'http://127.0.0.1:5000';

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch(`${backend}/upload`, {
          method: 'POST',
          body: formData,
        });
        // File uploaded successfully
        const data = await response.json();
        console.log(data); // Log the response data

      } catch (error) {
        console.log(error)
        // Handle error
      }
    }
  };


  return (
    <>
      <p>Test</p>
      <div ref={waveformRef}></div>
      <button onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
    </>
  );
}

export default App;