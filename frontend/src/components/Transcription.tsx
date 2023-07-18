import React from 'react';
import styles from './Transcription.module.css';

const Transcription: React.FC<any> = ({ elanData = {}, tierList }) => {

    return (
        <div>
            {tierList.map((objectname: string) => {
                const objects = elanData[objectname];
                return <div key={objectname}>
                    <h2>{objectname}</h2>
                    {objects.map((obj: any, index: number) => (
                        <div key={index} className={`${styles.common} ${index % 2 === 0 ? styles.even : styles.odd}`}>
                            {/* Render the specific properties of the object */}
                            <span>{obj.annotation_value} {obj.time_slot_ref1} - {obj.time_slot_ref2}</span>
                        </div>
                    ))}
                </div>
            })}
        </div>
    )
};

export default Transcription;