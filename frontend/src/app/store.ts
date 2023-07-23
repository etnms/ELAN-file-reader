import { configureStore } from '@reduxjs/toolkit'
import ElanDataSlice from '../components/features/ElanDataSlice'
import CurrentTimeSlice from '../components/features/CurrentTimeSlice'
import SelectedFilesSlice from '../components/features/SelectedFilesSlice'

export const store = configureStore({
  reducer: {
    elanData: ElanDataSlice,
    currentTime: CurrentTimeSlice,
    selectedFiles: SelectedFilesSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch