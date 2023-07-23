import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { TierData } from '../../utils/types'

interface ElanData {
  elanData: TierData,
  tierList: string[]
}

const initialState: ElanData = {
  elanData: {},
  tierList: []
}

export const elanDataSlice = createSlice({
  name: 'elanData',
  initialState,
  reducers: {
    setElanData: (state, action: PayloadAction<any>) => {
      state.elanData = action.payload
    },
    setTierList: (state, action: PayloadAction<any>) => {
      state.tierList = action.payload
    }
  }
})

export const { setElanData, setTierList } = elanDataSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectElanData = (state: RootState) => state.elanData;

export default elanDataSlice.reducer