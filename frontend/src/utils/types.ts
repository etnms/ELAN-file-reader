export interface Dictionary {
    [key: string]: string;
}

export interface TranscriptionProps {
    elanData?: Dictionary;
}

export interface TierDropdownProps {
    tiers: string[]
}
