import { useEffect } from 'react';

interface IElanData {
    elanData: any
}

const Transcription = (props: IElanData) => {

    const { elanData } = props;

    const displayData = () => {
        if (elanData === undefined) return; // If no data do nothing

        return Object.keys(elanData).map((key: any) => {
            return <p>{elanData[key]} - {key}</p>
        })
    }

    return (
        <div>
            {displayData()}
        </div>
    );
};

export default Transcription;