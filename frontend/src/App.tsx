import { useState } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import ElanInput from './components/ElanInput';
import TierDropdown from './components/TierDropdown';
import Transcription from './components/Transcription';

function App() {

  const [tierList, setTierList] = useState<string[]>([]);
  const [elanData, setElanData] = useState<any>();

  return (
    <>
      <p>Test</p>
      <AudioPlayer />
      <div>
        <ElanInput setTierList={setTierList} setElanData={setElanData} />
        <TierDropdown tiers={tierList} />
        <Transcription elanData={elanData}/>
      </div>
    </>
  );
}

export default App;