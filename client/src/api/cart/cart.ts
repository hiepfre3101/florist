import { ProductInCart } from '../../interface/cart'
import instance from '../config'

export const addToCart = (data: ProductInCart) => {
   return instance.post('/cart', data)
}
export const removeItemInCart = (idProduct: string) => {
   return instance.put(`/cart/${idProduct}`)
}
export const getCart = (idUser: string) => {
   return instance.get(`/cart/${idUser}`)
}
