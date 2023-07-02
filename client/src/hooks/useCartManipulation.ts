import { useState } from 'react'
import { useAppSelector } from './redux/hooks'
import { useAddToCartMutation, useChangeQuantityMutation, useRemoveProductMutation } from '../api-slices/cart.service'
import { ProductInCart } from '../interface/cart'
import { selectorUser } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import useDebounce from './useDebounce'
import { message } from 'antd'

const useCartManipulation = () => {
   const [quantity, setQuantity] = useState<number>(1)
   const finalQuantity = useDebounce<number>(quantity, 1000)
   const [isSend, setIsSend] = useState(false)
   const [addCart, { status }] = useAddToCartMutation()
   const [changeQuantity] = useChangeQuantityMutation()
   const [removeItem] = useRemoveProductMutation()
   const navigate = useNavigate()
   const user = useAppSelector(selectorUser)
   const addToCart = (product: ProductInCart) => {
      if (!user._id) {
         return navigate('/auth')
      }
      addCart({ userId: user._id, ...product })
   }
   const handleChangeQuantity = async (data: { quantity: string | number }, idProduct: string) => {
      if (data.quantity !== null || (data.quantity !== '' && finalQuantity !== quantity)) {
         try {
            setIsSend(true)
            await changeQuantity({ userId: user._id, productId: idProduct, ...data })
            setIsSend(false)
         } catch (error) {
            setIsSend(false)
            setQuantity((prev) => prev)
            console.log(error)
         }
      }
   }
   const removeProduct = (idProduct: string) => {
      removeItem({ userId: user._id, productId: idProduct })
   }
   return { addToCart, quantity, setQuantity, removeProduct, handleChangeQuantity, isSend }
}

export default useCartManipulation
