import { useState } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import ElanInput from './components/ElanInput';
import TierDropdown from './components/TierDropdown';

function App() {

  const [tierList, setTierList] = useState<string[]>([]);

  return (
    <>
      <p>Test</p>
      <AudioPlayer />
      <div>
        <ElanInput setTierList={setTierList} />
        <TierDropdown tiers={tierList} />
      </div>
    </>
  );
}

export default App;