import React from 'react'
import { IProduct } from '../../interface/product'
import { CloseOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../hooks/redux/hooks'
import { cartSlice } from './cartSlice'
import { InputNumber } from 'antd'
type Props = {
   product: IProduct & { quantity: number }
   type: 'checkout' | 'hover'
}

const ProductCart = ({ product, type }: Props) => {
   const dispatch = useAppDispatch()
   const handleRemoveProduct = (id: string) => {
      dispatch(cartSlice.actions.removeItem(id))
   }
   const handleChangeQuantity = (value: number | null) => {
      if (value !== null || value !== '') {
         dispatch(cartSlice.actions.changeQuantity({ _id: product._id, quantity: value }))
      }
   }
   return (
      <div className='grid grid-cols-6 gap-2  relative mb-5 mt-5'>
         <img src={product?.images[0]?.url} className='aspect-square' alt='img' />
         <div className='flex flex-col items-start col-span-2'>
            <p className='text-primary'>{product?.name}</p>
            <p className='text-greenY'>${product?.price}</p>
         </div>
         {type === 'checkout' && (
            <InputNumber<number>
               className='ml-4 max-h-10 text-lg  font-vollkorn rounded-none'
               min={1}
               defaultValue={product?.quantity}
               keyboard={true}
               required
               onChange={handleChangeQuantity}
            />
         )}
         <p className='font-semibold ml-10'>
            x<span className='text-xl'>{product.quantity}</span>
         </p>
         <div>
            <button
               className={`w-[20px] h-[20px]  flex justify-center items-center rounded-full absolute right-1  top-3 ${
                  type === 'checkout' ? 'p-4 hover:underline hover:bg-none text-primary' : 'hover:bg-[rgba(0,0,0,0.1)]'
               } `}
               onClick={() => handleRemoveProduct(product?._id)}
            >
               {type === 'checkout' ? 'Remove' : <CloseOutlined className='text-primary' />}
            </button>
         </div>
      </div>
   )
}

export default ProductCart
