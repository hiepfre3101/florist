import { IOrder } from '../../interface/order'
import instance from '../config'

export const createOrder = (data: IOrder) => {
   return instance.post('/orders', data)
}
