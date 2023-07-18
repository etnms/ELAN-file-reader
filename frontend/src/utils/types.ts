export interface Dictionary {
    [key: string]: string;
}

export interface TranscriptionProps {
    elanData?: Dictionary;
}

export interface TierDropdownProps {
    tiers: string[]
}

export interface TierData {
    [tierName: string]: {
        time_slot_ref1: string,
        time_slot_ref2: string,
        annotation_value: string,
    }
}