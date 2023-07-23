import React, { ChangeEvent } from 'react';
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

  const handleAudioFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAudioFile(event.target.files[0]);
    }
  };


  const handleElanFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setElanFile(event.target.files[0]);
    }
  };


  const handleElanFileUpload: () => Promise<void> = async () => {
    if (elanFile) {
      const formData: FormData = new FormData();
      formData.append('file', elanFile);
      try {
        const response: Response = await fetch(`${backendURL}/upload`, {
          method: 'POST',
          body: formData,
        });

        // File uploaded successfully
        if (response.ok) {
          const data = await response.json();
          dispatch(setTierList(data.tiers));
          dispatch(setElanData(data.elanData));
        }
        else {
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

  return (
    <div className={styles['upload-section']}>
      <h3>Upload your audio file and its corresponding elan file:</h3>
      <div className={styles.container}>
        <FileInput handleFileupload={handleAudioFileUpload} handleFileChange={handleAudioFileChange} title='Audio' />
        <FileInput handleFileupload={handleElanFileUpload} handleFileChange={handleElanFileChange} title='Eaf' />
      </div>
    </div>
  );
};

export default UploadFiles;