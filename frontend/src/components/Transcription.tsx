import React, { useEffect } from 'react';
import styles from './Transcription.module.css';
import { useAppSelector } from '../app/hooks';

const Transcription: React.FC = () => {
  const elanData = useAppSelector((state) => state.elanData.elanData);
  const tierList = useAppSelector((state) => state.elanData.tierList);
  const currentTime: number = useAppSelector((state) => state.currentTime.currentTime);

  const convertToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(()=> {
    console.log(elanData)
  },[])

  return (
    <div className={styles['container-transcription']}>
      {tierList.map((tierName: string) => {
        const tierData = elanData[tierName] || [];
        const filteredData = tierData.filter(
          (obj) =>
            convertToSeconds(obj.time_slot_ref1) <= currentTime && // - 1 and then + 1 to display more annotations
            convertToSeconds(obj.time_slot_ref2) >= currentTime
        );

        return (
          <div key={tierName} className={styles['tier-container']}>
            <div className={styles['tier-name']}>{tierName}</div>
            <div className={styles['tier-data-container']}>
              {filteredData.map((obj, index) => (
                <div key={index}>
                  <span>{obj.annotation_value}&nbsp;</span>
                </div>
              ))}
              {/* Empty div for cases where there is no corresponding text */}
              {filteredData.length === 0 && <div></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Transcription;