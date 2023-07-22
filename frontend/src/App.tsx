import { useEffect, useState } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import ElanInput from './components/ElanInput';
import TierDropdown from './components/TierDropdown';
import Transcription from './components/Transcription';
import { TierData } from './utils/types';
import Title from './components/Title';
import styles from './App.module.css';

const App: React.FC = () => {

  const [tierList, setTierList] = useState<string[]>([]);
  const [elanData, setElanData] = useState<TierData>();
  const [currentTime, setCurrentTime] = useState<any>();

  useEffect(() => {
    document.title = "ELAN file reader";
  })
  return (
    <main className={styles.main}>
      <Title/>
      <AudioPlayer setCurrentTime={setCurrentTime} currentTime= {currentTime} />
      <div>
        <ElanInput setTierList={setTierList} setElanData={setElanData} />
        {/*<TierDropdown tiers={tierList} />*/}
        <Transcription elanData={elanData} tierList={tierList} currentTime={currentTime}/>
      </div>
    </main>
  );
}

export default App;