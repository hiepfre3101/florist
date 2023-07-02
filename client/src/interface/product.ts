import { IImage } from './image'
import { ICategory } from './category'
import { TypeForm } from '../configAntd/custom-form/configForm'

export interface IProduct {
   _id: string
   price: number
   name: string
   ingredients?: {
      flower: {
         _id: string
         name: string
      }
      quantity: number
   }[]
   images: IImage[]
   description: string
   categories: ICategory[]
   type: TypeForm
}
export interface IInputProduct {
   name: string
   price: number
   description: string
   images: string[]
   ingredients?: IngredientInput[]
   materials?: string[]
   categories: string[]
   type: TypeForm
}

export interface IProductResponse {
   message: string
   data: {
      docs: IProduct[]
      hasNextPage: boolean
      hasPrevPage: boolean
      page: number
      limit: number
      totalDocs: number
   }
}
export interface IngredientInput {
   flower: string
   quantity: number
   selectValue?: string
   inputValue?: number
}
