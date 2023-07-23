import React from 'react';
import styles from './Transcription.module.css';
import { useAppSelector } from '../app/hooks';

const Transcription: React.FC = () => {

  const elanData = useAppSelector(state => state.elanData.elanData);
  const tierList = useAppSelector(state => state.elanData.tierList);

  const currentTime: number = useAppSelector(state => state.currentTime.currentTime);
  const convertToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  return (
    <div>
      <div>
        {tierList.map((tierName: string) => {
          const tierData = elanData[tierName] || [];
          const filteredData = tierData.filter(
            (obj: any) =>
              convertToSeconds(obj.time_slot_ref1) <= currentTime && // - 1 and then + 1 to display more annotations
              convertToSeconds(obj.time_slot_ref2) >= currentTime
          );

          return (
            <div key={tierName} className={styles.display}>
              <div className={styles['display-name']}>
                {tierName}
              </div>
              {filteredData.map((obj: any, index: any) => (
                <div
                  key={index}
                  className={`${styles.common} ${index % 2 === 0 ? styles.even : styles.odd}`}
                >
                  <span>
                    {obj.annotation_value}
                  </span>
                </div>
              ))}

            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Transcription;