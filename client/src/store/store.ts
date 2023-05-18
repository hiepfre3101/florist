import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import imageReducer from '../slices/imageSlice'
import cartReducer from '../slices/cartSlice'
export const store = configureStore({
   reducer: {
      auth: authReducer,
      images: imageReducer,
      cart: cartReducer
   }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
