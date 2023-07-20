import { useState } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import ElanInput from './components/ElanInput';
import TierDropdown from './components/TierDropdown';
import Transcription from './components/Transcription';
import { TierData } from './utils/types';


const App: React.FC = () => {

  const [tierList, setTierList] = useState<string[]>([]);
  const [elanData, setElanData] = useState<TierData>();
  const [currentTime, setCurrentTime] = useState<any>();
  return (
    <>
      <h1>ELAN file reader</h1>
      <AudioPlayer setCurrentTime={setCurrentTime} currentTime= {currentTime} />
      <div>
        <ElanInput setTierList={setTierList} setElanData={setElanData} />
        <TierDropdown tiers={tierList} />
        <Transcription elanData={elanData} tierList={tierList} currentTime={currentTime}/>
      </div>
    </>
  );
}

export default App;