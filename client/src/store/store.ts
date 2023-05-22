import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import imageReducer from '../slices/imageSlice'
import cartReducer from '../slices/cartSlice'
import { hoaApi } from '../APIslices/base'
export const store = configureStore({
   reducer: {
      [hoaApi.reducerPath]: hoaApi.reducer,
      auth: authReducer,
      images: imageReducer,
      cart: cartReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hoaApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
