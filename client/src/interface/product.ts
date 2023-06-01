import { ProductInCart } from './cart';
import { UploadFile } from 'antd'
import { IImage } from './image'
import { ICategory } from './category'
import { ITypeOfProduct } from './type'

export interface IProduct {
   _id: string
   price: number
   name: string
   images: IImage[]
   description: string
   type: ITypeOfProduct
   categories: ICategory[]
}
export interface IInputProduct {
   name: string
   price: number
   description: string
   images: string[]
   type: string
   categories: string[]
}

export interface IDataResponse {
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
