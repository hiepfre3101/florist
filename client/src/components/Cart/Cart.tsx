import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks'
import { cartSlice, productSelector, totalSelector } from '../../slices/cartSlice'
import ProductCart from './ProductCart'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Collapse, Input, message } from 'antd'
import { IOrder } from '../../interface/order'
import { createOrder } from '../../api/order/order'
import { adminSocket, socket } from '../../socket/config'
type Props = {}

const Cart = (props: Props) => {
   const dispatch = useAppDispatch()
   const [loadingBtn, setLoadingBtn] = useState(false)
   const products = useAppSelector(productSelector)
   const navigate = useNavigate()
   const total = useAppSelector(totalSelector)
   const { Panel } = Collapse

   const resetCart = () => {
      dispatch(cartSlice.actions.setCart([]))
      localStorage.removeItem('cart')
   }
   const handleCheckout = async () => {
      setLoadingBtn(true)
      const productListSumbit = products.map((product) => ({ product_id: product._id, quantity: product.quantity }))
      const userExist = localStorage.getItem('user')
      let userId
      if (!userExist) {
         navigate('/auth')
         return
      }
      userId = JSON.parse(userExist!)._id as string
      try {
         const dataSubmit: IOrder = {
            total,
            user: userId,
            products: productListSumbit
         }
         const { data } = await createOrder(dataSubmit)
         adminSocket.emit('newOrder', { data: userId })
         socket.emit('newOrder', { data: userId })
         resetCart()
         setLoadingBtn(false)
         message.info(data.message)
      } catch (error) {
         setLoadingBtn(false)
         message.error('Failed to create order!')
         console.log(error)
      }
   }
   return (
      <div className='min-h-[800px] pt-10 px-40'>
         <p className='text-[3rem] text-primary'>Cart</p>
         <hr className='text-gray w-2/3' />
         {products.length === 0 && <p className='text-primary text-3xl pt-10'>Cart Empty</p>}
         <div className={`grid grid-cols-3 gap-10`}>
            <div className='flex flex-col items-center p-5 col-start-1 col-end-3 h-[800px] overflow-auto'>
               {products.map((product, index) => (
                  <ProductCart product={product} type='checkout' key={index} />
               ))}
            </div>
            {products.length > 0 ? (
               <div className='p-5 border border-gray  max-h-[500px] relative'>
                  <p className='uppercase text-primary'>order summary</p>
                  <div className='border-t-[rgba(0,0,0,0.2)] pt-5 max-h-[300px] overflow-auto flex justify-between mt-10 border-t text-primary font-semibold'>
                     <div className='w-[40%]'>
                        <p>Subtotal:</p>
                        <p>Coupon zip:</p>
                     </div>
                     <div className='flex-1 duration-500 flex flex-col items-end'>
                        <p>${total}</p>
                        <Collapse size='small' ghost className=' w-full !p-0'>
                           <Panel key={'1'} header={<p className='text-gray text-end'>Enter code</p>}>
                              <div className='flex gap-2 w-full absolute right-0 px-2 pl-5'>
                                 <Input />
                                 <button className='p-2 font-vollkorn bg-primary text-white'>Calculate</button>
                              </div>
                           </Panel>
                        </Collapse>
                     </div>
                  </div>
                  <div className='border-t-[rgba(0,0,0,0.2)] left-0 p-5 flex gap-1 w-full justify-between absolute bottom-4 flex-wrap'>
                     <div className='w-full flex justify-between'>
                        <div className='w-[20%]'>
                           {' '}
                           <p className='text-3xl text-primary font-semibold'>Total:</p>
                           <p className='text-primary'>Discount:</p>
                        </div>
                        <div className='w-[60%] text-end'>
                           <p className='text-3xl text-greenY'>${total}</p>
                           <p className='text-greenY'>0%</p>
                        </div>
                     </div>
                     <Button
                        loading={loadingBtn}
                        onClick={handleCheckout}
                        className='flex-1 bg-greenY text-white py-5 flex justify-center items-center  hover:!border-greenY hover:!text-white font-vollkorn rounded-none '
                     >
                        Checkout
                     </Button>
                  </div>
               </div>
            ) : (
               <div className='relative'>
                  <Link to='/' className='absolute top-0'>
                     <button className='bg-primary p-5 text-white'>Sign In</button>
                  </Link>
                  <Link to='/' className='absolute top-0'>
                     <button className='bg-primary p-5 text-white'>Continue Shopping</button>
                  </Link>
               </div>
            )}
         </div>
      </div>
   )
}

export default Cart
