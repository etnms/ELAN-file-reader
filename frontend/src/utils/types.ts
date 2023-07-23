export interface TierData {
    [tierName: string]: {
        time_slot_ref1: string,
        time_slot_ref2: string,
        annotation_value: string,
    }[]
}

export interface CurrentTime {
    currentTime: number
}

export interface SelectedFile {

    fileUrl: string,
}