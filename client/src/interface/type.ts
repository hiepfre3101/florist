import { ICategory } from './category'
import { IProduct } from './product'

export interface ITypeOfProduct {
   _id: string
   name: string
   subCategories: ICategory[]
   products: IProduct[]
}
