import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { SelectedFile } from '../../utils/types'


const initialState: SelectedFile = {
    fileUrl: '',
}

export const selectedFilesSlice = createSlice({
    name: 'selectedFile',
    initialState,
    reducers: {
        setFileUrl: (state, action: PayloadAction<string>) => {
            state.fileUrl = action.payload
        }
    }
})

export const { setFileUrl } = selectedFilesSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedFile = (state: RootState) => state.selectedFiles;

export default selectedFilesSlice.reducer