import { useEffect, useState } from 'react'
import { IProduct } from '../../interface/product'
import { getAllProduct } from '../../api/product/product'
import Loading from '../../components/Loading/Loading'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'


const ProductOfHero = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [products, setProducts] = useState<IProduct[]>([])
   const [index, setIndex] = useState<number>(0)
   useEffect(() => {
      ;(async () => {
         try {
            setIsLoading(true)
            const {
               data: {
                  products: { docs }
               }
            } = await getAllProduct({ limit: 5 })
            setIsLoading(false)
            setProducts(docs)
         } catch (error) {
            console.log(error)
         }
      })()
   }, [])
   const handleNext = () => {
      if (index === products.length - 1) {
         setIndex(0)
         return
      }
      setIndex((prev) => prev + 1)
   }

   const handlePrev = () => {
      if (index === 0) {
         setIndex(0)
         return
      }
      setIndex((prev) => prev - 1)
   }

   if (isLoading) return <Loading />
   return (
      <div className='flex flex-col justify-end w-full h-full items-center pb-5 relative gap-5'>
         <Link
            to={`/${products[index]?._id}`}
            className='min-w-[240px] max-w-[300px] h-[250px] bg-yellowW rounded-lg rounded-br-3xl relative'
         >
            <img
               src={products[index]?.images[0].url}
               alt='img'
               className='absolute left-4 right-2 top-[-55%] w-[200px]  aspect-auto'
            />
            <div className='absolute  bottom-[5%] left-[50%] translate-x-[-50%] flex flex-col items-center gap-2'>
               <p className='uppercase text-primary font-semibold'>{products[index]?.name}</p>
               <p className='text-greenY'>$ {products[index]?.price}</p>
            </div>
         </Link>
         <div className='flex gap-2'>
            <button
               onClick={handlePrev}
               className='duration-300 hover:bg-[rgba(0,0,0,0.1)] w-[30px] h-[30px] flex items-center justify-center rounded-full'
            >
               <ArrowLeftOutlined className='text-primary font-bold' />
            </button>
            <button
               onClick={handleNext}
               className='duration-300 hover:bg-[rgba(0,0,0,0.1)] w-[30px] h-[30px] flex items-center justify-center rounded-full'
            >
               <ArrowRightOutlined className='text-primary font-bold' />
            </button>
         </div>
      </div>
   )
}

export default ProductOfHero
