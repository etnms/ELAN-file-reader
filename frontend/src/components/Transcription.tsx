import { Dictionary, TranscriptionProps } from "../utils/types";

const Transcription: React.FC<TranscriptionProps> = ({ elanData = {} }) => {
    const dictionaryArray: Dictionary[] = Object.entries(elanData).map(([sentence, timeValue]) => ({
        sentence,
        timeValue,
    }));

    const sortedDictionary: Dictionary[] = dictionaryArray.sort((a, b) => a.timeValue.localeCompare(b.timeValue));

    return (
        <div>
            <div>
                {sortedDictionary.map((entry) => (
                    <div key={entry.sentence}>
                        <span>{entry.sentence}: </span>
                        <span>{entry.timeValue}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transcription;