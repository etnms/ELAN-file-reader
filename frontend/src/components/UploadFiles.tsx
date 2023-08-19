import React, { ChangeEvent, useState } from 'react';
import FileInput from './FileInput';
import styles from './UploadFiles.module.css';
import { useAppDispatch } from '../app/hooks';
import { setElanData, setTierList } from './features/ElanDataSlice';
import { setFileUrl } from './features/SelectedFilesSlice';

interface UploadFilesProps {
  audioFile: File | null,
  setAudioFile: Function,
  elanFile: File | null,
  setElanFile: Function
}

const UploadFiles: React.FC<UploadFilesProps> = ({ audioFile, setAudioFile, elanFile, setElanFile }) => {

  const backendURL: string = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useAppDispatch()

  const [audioFileName, setAudioFileName] = useState<string>('');
  const [elanFileName, setElanFileName] = useState<string>('');

  const [errorTextAudio, setErrorTextAudio] = useState<string>('');
  const [errorTextElan, setErrorTextElan] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, setFileName: Function, setFile: Function) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setFile(event.target.files[0])
    }
  }

  const handleElanFileUpload: () => Promise<void> = async () => {
    if (elanFile) {
      const formData: FormData = new FormData();
      formData.append('file', elanFile);
      formData.append('type', 'elan')
      try {
        const response: Response = await fetch(`${backendURL}/upload`, {
          method: 'POST',
          body: formData,
        });

        // File uploaded successfully
        if (response.ok) {
          const data = await response.json();
          setErrorTextElan('')
          dispatch(setTierList(data.tiers));
          dispatch(setElanData(data.elanData));
        }
        else {
          setErrorTextElan('Error: wrong file format. You need a .eaf file.');
          // Handle error
          console.log('Error:', response.statusText);
        }

      } catch (error) {
        // Handle error
        console.log('Error:', error);

      }
    }
  }

  const handleAudioFileUpload: () => Promise<void> = async () => {
    if (audioFile) {
      const formData: FormData = new FormData();
      formData.append('file', audioFile);
      formData.append('type', 'audio')
      try {
        const response: Response = await fetch(`${backendURL}/upload`, {
          method: 'POST',
          body: formData,
        });

        // File uploaded successfully
        if (response.ok) {
          const data = await response.json();
          const fileUrl: string = data.file_url;
          dispatch(setFileUrl(fileUrl));
          setErrorTextAudio('')
        }
        else {
          setErrorTextAudio('Error: wrong file format. You need au audio file (for example .mp3, .wav).')
          console.log('Error:', response.statusText);
        }

      } catch (error) {
        console.log('Error:', error);
        // Handle error
      }
    }
  };

  return (
    <div className={styles['upload-section']}>
      <h3>Upload your audio file and its corresponding elan file:</h3>
      <div className={styles.container}>
        <FileInput handleFileupload={handleAudioFileUpload} handleFileChange={(e) => handleFileChange(e, setAudioFileName, setAudioFile)} title='Audio' fileName={audioFileName} errorText={errorTextAudio} />
        <FileInput handleFileupload={handleElanFileUpload} handleFileChange={(e) => handleFileChange(e, setElanFileName, setElanFile)} title='Eaf' fileName={elanFileName} errorText={errorTextElan}/>
      </div>
    </div>
  );
};

export default UploadFiles;