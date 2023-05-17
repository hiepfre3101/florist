import { IProduct } from './product'

export type ProductInCart = IProduct & { quantity: number }
export type ICart = {
   products: ProductInCart[],
   total:number,
   haveNew:boolean
}
