import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/authSlice'
import imageSlice from '../components/Modal/ModalUpload/imageSlice'
import cartSlice from '../components/Cart/cartSlice'
export const store = configureStore({
   reducer: {
      auth: authReducer,
      images: imageSlice,
      cart: cartSlice
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
