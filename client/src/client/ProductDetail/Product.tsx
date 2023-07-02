import { useEffect, useState } from 'react'
import { IProduct } from '../../interface/product'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOneProduct } from '../../api/product/product'
import SlideProduct from './SlideProduct'
import { InputNumber, Rate } from 'antd'
import Loading from '../../components/Loading/Loading'
import useCartManipulation from '../../hooks/useCartManipulation'
import { ProductInCart } from '../../interface/cart'
import { TypeForm } from '../../configAntd/custom-form/configForm'
const Product = () => {
   const { addToCart, quantity, setQuantity } = useCartManipulation()
   const { id: idProduct } = useParams()
   const navigate = useNavigate()
   const [product, setProduct] = useState({} as IProduct)
   const [loading, setLoading] = useState<boolean>(false)
   const type: TypeForm | null = new URLSearchParams(useLocation().search).get('type') as TypeForm
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      if (type === null || !type) {
         navigate('/error')
      }
      ;(async () => {
         try {
            setLoading(true)
            const { data } = await getOneProduct(idProduct, type)
            setProduct(data.data)
            setLoading(false)
         } catch (error) {
            console.log(error)
            navigate('/error')
         }
      })()
   }, [idProduct])

   if (loading) return <Loading sreenSize='md' />
   return (
      <div className='gap-32 mt-10 px-36 grid grid-cols-5 w-full pb-10'>
         <SlideProduct product={product} />
         <div className='col-start-4 col-span-2'>
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
               onClick={() =>
                  addToCart({
                     productId: product._id,
                     price: product.price,
                     image: product?.images[0].url,
                     name: product.name,
                     quantity
                  } as ProductInCart)
               }
               className='w-full bg-greenY text-white rounded-sm p-3 mt-10'
            >
               Add to bag
            </button>
            <div className='mt-10 w-full flex flex-col items-start'>
               <p className='text-primary text-lg font-semibold'>Product Infomation</p>
               <div className='text-gray'>
                  {product?.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia repellendus
                  tenetur asperiores, aspernatur minus ab accusamus dignissimos quaerat? Suscipit vero commodi dolorum
                  rem et ducimus, consectetur harum? Nesciunt, alias quisquam?
               </div>
               <p className='text-black mt-10 font-semibold'>This bouquet includes :</p>
               <div className='text-gray flex flex-col items-start'>
                  {type === 'bouquet' &&
                     product.ingredients?.map((item) => (
                        <p key={item.flower._id}>
                           {item.quantity} x {item.flower.name}
                        </p>
                     ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Product
