import { cartSlice } from './../components/Cart/cartSlice'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { priceProductSelector } from '../components/Cart/cartSlice'
import { IProduct } from '../interface/product'

const useCartManipulation = () => {
    const [quantity,setQuantity] = useState<number>(1);
   const dispatch = useAppDispatch()
   const addToCart = (product: IProduct, quantity: number) => {
      dispatch(cartSlice.actions.addCart({ ...product, quantity }))
      
   }

   return {addToCart,quantity,setQuantity}
}

export default useCartManipulation
