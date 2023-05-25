import React, { useState } from 'react'
import { IProduct } from '../../interface/product'
import { CloseOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../hooks/redux/hooks'
import { InputNumber } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ProductInCart } from '../../interface/cart'
import useCartManipulation from '../../hooks/useCartManipulation'
type Props = {
   product: ProductInCart
   type: 'checkout' | 'hover'
}

const ProductCart = ({ product, type }: Props) => {
   const navigate = useNavigate()
   const { removeProduct, handleChangeQuantity, isSend } = useCartManipulation()
   const goToProduct = () => {
      if (type === 'hover') navigate(`/${product.productId}`)
   }
   return (
      <div className='relative' onClick={goToProduct}>
         <div className='grid grid-cols-6 gap-2  relative mb-5 mt-5'>
            <img src={product?.image} className='aspect-square' alt='img' />
            <div className='flex flex-col items-start col-span-2'>
               <p className='text-primary'>{product?.name}</p>
               <p className='text-greenY'>${product?.price}</p>
            </div>
            {type === 'checkout' && (
               <InputNumber<number>
                  className='ml-4 max-h-10 text-lg z-50  font-vollkorn rounded-none'
                  min={1}
                  defaultValue={product?.quantity}
                  keyboard={true}
                  required
                  onChange={(value) => handleChangeQuantity({ value: value as number }, product.productId)}
                  disabled={isSend}
               />
            )}
            {type === 'checkout' && (
               <p className='font-semibold ml-10'>
                  x<span className='text-xl'>{product.quantity}</span>
               </p>
            )}
            <div>
               <button
                  className={`w-[20px] h-[20px] z-50  flex justify-center items-center rounded-full absolute right-1  top-3 ${
                     type === 'checkout'
                        ? 'p-4 hover:underline hover:bg-none text-primary'
                        : 'hover:bg-[rgba(0,0,0,0.1)]'
                  } `}
                  onClick={() => removeProduct(product?.productId)}
               >
                  {type === 'checkout' ? 'Remove' : <CloseOutlined className='text-primary' />}
               </button>
            </div>
         </div>
      </div>
   )
}

export default ProductCart
