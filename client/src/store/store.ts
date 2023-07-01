import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import imageReducer from '../slices/imageSlice'
import { hoaApi } from '../api-slices/base.service'
export const store = configureStore({
   reducer: {
      [hoaApi.reducerPath]: hoaApi.reducer,
      auth: authReducer,
      images: imageReducer,
   },
   //add middleware to enable caching, invalidation, polling of rtk query
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hoaApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
