import { useEffect, useState } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import ElanInput from './components/ElanInput';
import TierDropdown from './components/TierDropdown';
import Transcription from './components/Transcription';
import { TierData } from './utils/types';


const App: React.FC = () => {

  const [tierList, setTierList] = useState<string[]>([]);
  const [elanData, setElanData] = useState<TierData>();

  useEffect(() => {
    console.log(elanData)
  }, [elanData])

  return (
    <>
      <p>Test</p>
      <AudioPlayer />
      <div>
        <ElanInput setTierList={setTierList} setElanData={setElanData} />
        <TierDropdown tiers={tierList} />
        <Transcription elanData={elanData} tierList={tierList}/>
      </div>
    </>
  );
}

export default App;