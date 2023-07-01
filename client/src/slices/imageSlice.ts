import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store/store'
import { IImage } from '../interface/image'

interface IImageState {
   images: IImage[]
   listOfIdMongo: string[]
   imagesSelected: string[]
}

const initState: IImageState = {
   images: [],
   listOfIdMongo: [],
   imagesSelected: []
}

export const imageSlice = createSlice({
   name: 'images',
   initialState: initState,
   reducers: {
      setImages: (state: IImageState, action) => {
         state.images = action.payload
      },
      setIdsMongo: (state: IImageState, action) => {
         state.listOfIdMongo = action.payload
      },
      pushIdMongo: (state: IImageState, action) => {
         if (state.listOfIdMongo.length === 0) {
            state.listOfIdMongo = [...state.listOfIdMongo, action.payload]
         } else {
            state.listOfIdMongo.forEach((id) => {
               if (id !== action.payload || !id) {
                  state.listOfIdMongo = [...state.listOfIdMongo, action.payload]
               }
            })
         }
      },
      pushImagesSelected: (state: IImageState, action) => {
         action.payload.forEach((id: string) => {
            if (!state.imagesSelected.includes(id)) {
               state.imagesSelected = [...state.imagesSelected, id]
            }
         })
      },
      setImagesSelected: (state: IImageState, action) => {
         state.imagesSelected = action.payload
      }
   }
})
export const allPropertiesSelector = (state: RootState) => ({
   images: state.images.images,
   listId: state.images.listOfIdMongo,
   imagesSelected: state.images.imagesSelected
})
export const imagesSelectedSelector = (state: RootState) => state.images.imagesSelected
export const imagesSelector = (state: RootState) => state.images.images
export const listOfIdMongoSelector = (state: RootState) => state.images.listOfIdMongo
export default imageSlice.reducer
