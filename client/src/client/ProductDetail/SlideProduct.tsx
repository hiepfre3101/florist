import React, { useRef, useState } from 'react'
import Carousel, { CarouselRef } from 'antd/es/carousel'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'

import { IProduct } from '../../interface/product'

type Props = {
   product: IProduct
}

const SlideProduct = ({ product }: Props) => {
   const [currentSlide, setCurrentSlide] = useState<number>(0)
   const carouselRef = useRef<CarouselRef>(null)
   const NextArrow = () => (
      <button>
         <RightOutlined
            className='absolute hover:p-4 duration-300 right-1 top-1/2 p-3 bg-transparent drop-shadow-lg shadow-md rounded-full text-white font-normal text-md flex justify-center items-center'
            onClick={() => {
               carouselRef?.current?.next()

               if (currentSlide === product.images.length - 1) {
                  return setCurrentSlide(0)
               }
               return setCurrentSlide(currentSlide + 1)
            }}
         />
      </button>
   )
   const PrevArrow = () => {
      return (
         <button
            className='absolute drop-shadow-lg shadow-md hover:p-4 duration-300 left-1 top-1/2 z-10 p-3 bg-transparent  rounded-full text-white font-normal text-md flex justify-center items-center'
            onClick={() => {
               carouselRef?.current?.prev()
               if (currentSlide === 0) {
                  return setCurrentSlide(product.images.length - 1)
               }
               return setCurrentSlide(currentSlide - 1)
            }}
         >
            <LeftOutlined />
         </button>
      )
   }
   return (
      <div className='col-start-1 col-end-4 relative flex justify-start gap-10'>
         <div className='flex w-[15%] gap-2  justify-start flex-col'>
            {product?.images?.map((img, index) => (
               <div
                  key={index}
                  onClick={() => {
                     carouselRef?.current?.goTo(index)
                     setCurrentSlide(index)
                  }}
                  className='w-full relative'
               >
                  <img src={img.url} className='w-full aspect-square rounded-lg rounded-br-[1.5rem] cursor-pointer' />
                  {index !== currentSlide && (
                     <div className='cursor-pointer rounded-lg rounded-br-[1.5rem] bg-[rgba(222,222,222,0.5)] w-full h-full absolute top-0 left-0'></div>
                  )}
               </div>
            ))}
         </div>
         <div className='relative w-2/3 '>
            <Carousel
               ref={carouselRef}
               dots={false}
               lazyLoad='progressive'
               nextArrow={<NextArrow />}
               prevArrow={<PrevArrow />}
               arrows={true}
            >
               {product?.images?.map((img, index) => (
                  <img key={index} src={img.url} alt='img' className='rounded-md w-full aspect-square' />
               ))}
            </Carousel>
         </div>
      </div>
   )
}

export default SlideProduct
