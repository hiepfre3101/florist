import React from 'react'
import { useAppSelector } from '../../hooks/redux/hooks'
import { productSelector, totalSelector } from './cartSlice'
import ProductCart from './ProductCart'
import { Link } from 'react-router-dom'
import { Collapse, Input } from 'antd'

type Props = {}

const Cart = (props: Props) => {
   const products = useAppSelector(productSelector)
   const total = useAppSelector(totalSelector)
   const { Panel } = Collapse
   return (
      <div className='min-h-[800px] pt-10 px-40'>
         <p className='text-[3rem] text-primary'>Cart</p>
         <hr className='text-gray w-2/3' />
         {products.length === 0 && <p className='text-primary text-3xl pt-10'>Cart Empty</p>}
         <div className={`grid grid-cols-3 gap-40`}>
            <div className='flex flex-col items-center p-5 col-start-1 col-end-3 h-[800px] overflow-auto'>
               {products.map((product, index) => (
                  <ProductCart product={product} type='checkout' key={index} />
               ))}
            </div>
            {products.length > 0 ? (
               <div className='p-5 border border-gray  max-h-[500px] relative'>
                  <p className='uppercase text-primary'>order summary</p>
                  <div className='border-t-[rgba(0,0,0,0.2)] pt-5 max-h-[300px] overflow-auto flex justify-between mt-10 border-t text-primary font-semibold'>
                     <div className='w-[30%]'>
                        <p>Subtotal:</p>
                        <p>Coupon zip:</p>
                     </div>
                     <div className='duration-500'>
                        <p>${total}</p>
                        <Collapse size='small' ghost>
                           <Panel key={'1'} header={<p className='text-gray'>Enter code</p>}>
                              <div className='flex gap-2'>
                                 <Input />
                                 <button className='p-2 font-vollkorn bg-primary text-white'>Calculate</button>
                              </div>
                           </Panel>
                        </Collapse>
                     </div>
                  </div>
                  <div className='border-t-[rgba(0,0,0,0.2)] left-0 p-5 flex gap-3 w-full justify-between absolute bottom-4 flex-wrap'>
                     <div>
                        {' '}
                        <p className='text-3xl text-primary font-semibold'>Total:</p>
                        <p className='text-primary'>Discount:</p>
                     </div>
                     <div className='w-2/3 text-end'>
                        <p className='text-3xl text-greenY'>${total}</p>
                        <p className='text-greenY'>0%</p>
                     </div>
                     <button className='flex-1 bg-greenY text-white p-2'>Checkout</button>
                  </div>
               </div>
            ) : (
               <div className='relative'>
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