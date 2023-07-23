import { useEffect, useState } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Transcription from './components/Transcription';
import Title from './components/Title';
import styles from './App.module.css';
import UploadFiles from './components/UploadFiles';
import { Provider } from 'react-redux';
import { store } from "./app/store";

const App: React.FC = () => {

  useEffect(() => {
    document.title = "ELAN file reader";
  })

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [elanFile, setElanFile] = useState<File | null>(null);

  return (
    <Provider store={store}>
      <main className={styles.main}>
        <Title />
        <UploadFiles audioFile={audioFile} setAudioFile={setAudioFile} elanFile={elanFile} setElanFile={setElanFile}/>
        <AudioPlayer />
        <Transcription />
      </main>
    </Provider>
  );
}

export default App;