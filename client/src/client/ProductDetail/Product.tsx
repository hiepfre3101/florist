import { useEffect, useState } from 'react'
import { IProduct } from '../../interface/product'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../../api/product/product'
import SlideProduct from './SlideProduct'
import { Button, Input, InputNumber, message, Rate } from 'antd'
import Loading from '../../components/Loading/Loading'
import useCartManipulation from '../../hooks/useCartManipulation'
const Product = () => {
   const { addToCart, quantity, setQuantity } = useCartManipulation()
   const { id: idProduct } = useParams()
   const [product, setProduct] = useState({} as IProduct)
   const [loading, setLoading] = useState<boolean>(false)
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      ;(async () => {
         try {
            setLoading(true)
            const { data } = await getOneProduct(idProduct)
            setProduct(data.data)
            setLoading(false)
         } catch (error) {
            console.log(error)
         }
      })()
   }, [])

   if (loading) return <Loading sreenSize='md' />
   return (
      <div className='gap-32 mt-10 px-36 grid grid-cols-5 w-full pb-10'>
         <SlideProduct product={product} />
         <div className='col-start-4 col-span-2'>
            {product?.type && <p className='text-gray'>{product?.type.name}</p>}

            <p className='text-2xl text-primary italic'>{product?.name}</p>
            <div className='flex gap-4 text-orangeH'>
               <span className='text-md italic font-normal'>Price</span>
               <div>
                  <span className='mr-1 text-lg font-bold'>$</span>
                  <span className='text-xl font-bold'>{product?.price}</span>
               </div>
            </div>
            <Rate disabled defaultValue={4} className='text-greenY text-sm' />
            <InputNumber<number>
               className='ml-4 font-vollkorn rounded-none'
               min={1}
               onChange={(e) => setQuantity(e!)}
               defaultValue={1}
               keyboard={true}
               required
            />
            <button
               onClick={() => addToCart(product, quantity)}
               className='w-full bg-greenY text-white rounded-sm p-3 mt-10'
            >
               Add to bag
            </button>
            <div className='mt-10 w-full flex flex-col items-start'>
               <p className='text-primary text-lg font-semibold'>Product Infomation</p>
               <div className='text-gray'>
                  {product?.description} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias voluptatum
                  ratione ut nostrum? Facere, nostrum suscipit quos nobis voluptatum laboriosam, enim maiores, quisquam
                  deleniti ea recusandae dolore modi vel quam!
               </div>
               <p className='text-black mt-10 font-semibold'>This bouquet includes :</p>
               <div className='text-gray flex flex-col items-start'>
                  <p>3x Rose</p> <p>1x Rose</p> <p>3x Rose</p> <p>3x Rose</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Product
