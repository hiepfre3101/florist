import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/authSlice'
import imageSlice from '../components/Modal/ModalUpload/imageSlice'
export const store = configureStore({
   reducer: {
      auth: authReducer,
      images: imageSlice
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
