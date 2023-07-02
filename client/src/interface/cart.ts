import { TypeForm } from '../configAntd/custom-form/configForm'
import { IProduct } from './product'

export type ProductInCart = {
   productId: string
   name: string
   price: number
   image: string
   quantity: number
   type: TypeForm
}
export type ICart = {
   products: ProductInCart[]
   totalAmount: number
}
export type CartResponse = {
   message: string
   data: ICart
}
