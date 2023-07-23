import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { CurrentTime } from '../../utils/types'

const initialState: CurrentTime = {
    currentTime: 0,
}

export const currentTimeSlice = createSlice({
    name: 'currentTime',
    initialState,
    reducers: {
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload
        },
    }
})

export const { setCurrentTime } = currentTimeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentTime = (state: RootState) => state.currentTime;

export default currentTimeSlice.reducer