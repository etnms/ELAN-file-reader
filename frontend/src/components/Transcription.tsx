import React from 'react';
import styles from './Transcription.module.css';
import { TranscriptionProps } from '../utils/types';

const Transcription: React.FC<TranscriptionProps> = ({ elanData = {}, tierList, currentTime }) => {

  const convertToSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  return (
    <div>
      {tierList.map((tierName: string) => {
        const tierData = elanData[tierName] || [];
        const filteredData = tierData.filter(
          (obj) =>
            convertToSeconds(obj.time_slot_ref1) <= currentTime && // - 1 and then + 1 to display more annotations
            convertToSeconds(obj.time_slot_ref2) >= currentTime
        );

        return (
          <div key={tierName} className={styles.display}>
            <div className={styles['display-name']}>
              {tierName}
            </div>
              {filteredData.map((obj, index) => (
                <div
                  key={index}
                  className={`${styles.common} ${index % 2 === 0 ? styles.even : styles.odd}`}
                >
                  <span>
                    {obj.annotation_value} {obj.time_slot_ref1} - {obj.time_slot_ref2}
                  </span>
                </div>
              ))}

          </div>
        );
      })}
    </div>
  );
};

/*
return (
  <div>
      {tierList.map((tierName: string) => {
          const tierData = elanData[tierName] || [];
          return (
              <div key={tierName}>
                  <h2>{tierName}</h2>
                  {tierData.map((obj, index) => (
                      <div
                          key={index}
                          className={`${styles.common} ${index % 2 === 0 ? styles.even : styles.odd}`}
                          data-begin-time={obj.time_slot_ref1}
                          data-end-time={obj.time_slot_ref2}
                      >
                          <span>
                              {obj.annotation_value} {obj.time_slot_ref1} - {obj.time_slot_ref2}
                          </span>
                      </div>
                  ))}
              </div>
          );
      })}
  </div>
)
};
*/
export default Transcription;