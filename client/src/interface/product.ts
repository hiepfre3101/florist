import { UploadFile } from 'antd'
import { IImage } from './image'
import { ICategory } from './category'


export interface IProduct {
   _id: string
   price: number
   name: string
   images: IImage[]
   description: string
   categories: ICategory[]
}
export interface IInputProduct {
   name: string
   price: number
   description: string
   images: string[]
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
