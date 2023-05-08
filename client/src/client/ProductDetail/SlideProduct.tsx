import React, { useRef, useState } from 'react'
import { IProduct } from '../../interface/product'
import Carousel, { CarouselRef } from 'antd/es/carousel'

type Props = {
   product: IProduct
}

const SlideProduct = ({ product }: Props) => {
   const [currentSlide, setCurrentSlide] = useState<number>(0)
   const carouselRef = useRef<CarouselRef>(null)
   return (
      <div className='col-start-1 col-end-4 relative flex justify-between'>
         <div className='flex w-[20%] gap-5  justify-between flex-col'>
            {product?.images?.map((img, index) => (
               <div
                  onClick={() => {
                     carouselRef?.current?.goTo(index)
                     setCurrentSlide(index)
                  }}
                  className='w-full relative'
               >
                  <img
                     key={index}
                     src={img.url}
                     className='w-full aspect-square rounded-lg rounded-br-[1.5rem] cursor-pointer'
                  />
                  {index !== currentSlide && (
                     <div className='cursor-pointer rounded-lg rounded-br-[1.5rem] bg-[rgba(222,222,222,0.5)] w-full h-full absolute top-0 left-0'></div>
                  )}
               </div>
            ))}
         </div>
         <div className='relative w-2/3'>
            <Carousel ref={carouselRef} dots={false} lazyLoad='progressive'>
               {product?.images?.map((img, index) => (
                  <img
                     key={index}
                     src={img.url}
                     alt='img'
                     className='rounded-md w-full aspect-square rounded-br-3xl border border-gray'
                  />
               ))}
            </Carousel>
         </div>
      </div>
   )
}

export default SlideProduct
